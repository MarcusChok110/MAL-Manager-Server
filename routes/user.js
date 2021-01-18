// Imports for express/routing
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
  const token = req.header('Authorization');
  const url =
    'https://api.myanimelist.net/v2/users/@me?fields=anime_statistics';
  const options = {
    headers: {
      Authorization: token,
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

module.exports = router;
