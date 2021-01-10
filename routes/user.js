// Imports for express/routing
const express = require('express');
const router = express.Router();
const axios = require('axios');

const token = 'TOKEN_HERE';

axios({
  url: 'https://api.myanimelist.net/v2/users/@me',
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((response) => {
  console.log(response);
});
