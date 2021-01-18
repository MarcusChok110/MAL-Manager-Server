const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
  const token = req.cookies.auth_token;
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

module.exports = router;
