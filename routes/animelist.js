const express = require('express');
const router = express.Router();
const axios = require('axios');
const { response } = require('express');
const querystring = require('querystring');

// get request to get anime list from myanimelist api
router.get('/', (req, res) => {
  const token = req.signedCookies.auth_token;
  const url =
    'https://api.myanimelist.net/v2/users/@me/animelist?fields=list_status&limit=1000';
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .get(url, options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((response) => {
      console.error(response);
    });
});

router.put('/:animeId', (req, res) => {
  const anime = req.params.animeId;
  const url = `https://api.myanimelist.net/v2/anime/${anime}/my_list_status`;
  const token = req.signedCookies.auth_token;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const data = querystring.stringify(req.body);

  axios
    .put(url, data, options)
    .then((response) => {
      res.json({ success: true });
    })
    .catch((response) => {
      console.error(response);
      res.json({ success: false });
      throw new Error('Something went wrong with updating list entry');
    });
});

router.delete('/:animeId', (req, res) => {
  const anime = req.params.animeId;
  const url = `https://api.myanimelist.net/v2/anime/${anime}/my_list_status`;
  const token = req.signedCookies.auth_token;
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .delete(url, options)
    .then((response) => {
      res.json({ success: true });
    })
    .catch((response) => {
      console.error(response);
      res.json({ success: false });
      throw new Error('Something went wrong with delete list entry');
    });
});

module.exports = router;
