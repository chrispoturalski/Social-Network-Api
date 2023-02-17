const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
// const mongodb = require('mongodb').MongoClient;

const PORT = process.env.PORT || 3001;
const app = express();

// const connectionStringURI = process.env.MONGODB_URI || 'mongodb://localhost/social-network-api';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
