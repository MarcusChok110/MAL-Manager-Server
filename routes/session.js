// Imports for express/routing
const express = require('express');
const router = express.Router();

// Imports for generating login info
const base64url = require('base64url');
const crypto = require('crypto');
const randomstring = require('randomstring');
const querystring = require('querystring');
const axios = require('axios');
require('dotenv').config();

// MAL API Client ID
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const redirect_url = 'http://localhost:3000/login';

// GET request for login URL
router.get('/new', (req, res) => {
  res.json({
    url: generateLoginURL(),
  });
});

// POST request to use Authorisation code to obtain access token
router.post('/', (req, res) => {
  const { code, state } = req.body;
  if (!code || !state) {
    throw new Error('No code or state provided.');
  }

  const url = 'https://myanimelist.net/v1/oauth2/token';

  const data = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: code,
    code_verifier: state, // code verifier was passed as state in api call
    grant_type: 'authorization_code',
    redirect_url: redirect_url,
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  axios
    .post(url, querystring.stringify(data), config)
    .then((response) => {
      return response.data;
    })
    .then((response) => {
      return res
        .cookie('auth_token', response.access_token, {
          maxAge: 86_400_000,
          httpOnly: true,
        })
        .send();
    })
    .catch((response) => {
      console.error(response);
    });
});

// creates login url to be sent to user
function generateLoginURL() {
  const url = 'https://myanimelist.net/v1/oauth2/authorize';

  const code_verifier = generateCodeChallenge();

  const params = {
    response_type: 'code',
    client_id: CLIENT_ID,
    code_challenge: code_verifier,
    state: code_verifier,
  };

  return `${url}?${querystring.stringify(params)}`;
}

// MAL only allows plain transformation for Code Challenge
//    so Code Challenge = Code Verifier
function generateCodeChallenge() {
  let codeChallenge = '';

  // each iteration only generates 43 characters, so loop it thrice
  //    and substring to get a 128 character code challenge
  for (let i = 0; i < 3; i++) {
    codeChallenge += base64url.fromBase64(
      crypto
        .createHash('sha256')
        .update(randomstring.generate(128))
        .digest('base64')
    );
  }

  return codeChallenge.substring(0, 128);
}

module.exports = router;
