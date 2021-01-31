const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
// set port, listen for requests
const port = process.env.PORT || 8081;

const app = express();

// import db connection file
require('./src/database/mongo');

// Add cors
app.use(cors());
app.options('*', cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json({ extended: true, limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// import routes
require('./src/version/version1')(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});