const express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

// routes
const session = require('./routes/session');

const PORT = process.env.PORT || 8888;
const app = express();

// Enabled CORS
app.use(cors());
app.options('*', cors());

// Routes
app.use('/session', session);

app.get('/', (req, res) => {});

app.listen(PORT, () => {
  console.log(`Now listening on ${PORT}`);
});
