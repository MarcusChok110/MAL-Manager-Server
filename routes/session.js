// Imports for express/routing
const express = require('express');
const router = express.Router();

// Imports for generating login info
const base64url = require('base64url');
const crypto = require('crypto');
const randomstring = require('randomstring');
const querystring = require('querystring');
require('dotenv').config();

// MAL API Client ID
const CLIENT_ID = process.env.CLIENT_ID;

// GET request for login URL
router.get('/new', (req, res) => {
  res.json({
    url: generateLoginURL(),
  });
});

// creates login url to be sent to user
function generateLoginURL() {
  const url = 'https://myanimelist.net/v1/oauth2/authorize';

  const params = {
    response_type: 'code',
    client_id: CLIENT_ID,
    code_challenge: generateCodeChallenge(),
    state: 'malmanrq',
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
