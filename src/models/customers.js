const mongoose = require("mongoose");
const { Schema } = mongoose;

const Customer = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  addedOn: {
    type: Date,
    default: new Date().toISOString(),
  },
  updatedOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Customers', Customer);
