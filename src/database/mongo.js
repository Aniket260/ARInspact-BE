'use strict';
const mongoose = require('mongoose');
const database_URL = process.env.DATABASE_URL;
mongoose.Promise = global.Promise;

const option = {
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};
const env = process.env.NODE_ENV || 'development';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(database_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => { console.log('Mongo Server Connected Successfully...!', database_URL ); }, // eslint-disable-line
  (err) => { console.error('Failed to connect to MongoDB:', err.message); /** handle initial connection error */ }
);
// schema registered here
require('../models/addresses');
require('../models/customers');