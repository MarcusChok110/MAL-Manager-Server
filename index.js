const express = require('express');
const axios = require('axios');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

require('dotenv').config();

// routes
const session = require('./routes/session');
const user = require('./routes/user');
const animelist = require('./routes/animelist');

const PORT = process.env.PORT || 8888;
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const app = express();

const origin =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://mal-manager-client.herokuapp.com';

// Enabled CORS
const corsOptions = {
  origin: origin,
  credentials: true,
};
app.use(cors(corsOptions));

// parse body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// other middleware
app.use(helmet());
app.use(cookieParser(COOKIE_SECRET));

// Routes
app.use('/session', session);
app.use('/user', user);
app.use('/animelist', animelist);

app.get('/', (req, res) => {});

app.listen(PORT, () => {
  console.log(`Now listening on ${PORT}`);
});
