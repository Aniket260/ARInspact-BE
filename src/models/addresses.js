const mongoose = require("mongoose");
const { Schema } = mongoose;

const Address = new Schema({
  customerId:{
    type:Schema.Types.ObjectId,
    ref: 'Customers',
    required: true
  },
  addressLine1: {
    type: String,
  },
  addressLine2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
    maxlength: 6,
  },
  status: {
    type: String,
  },
  isPrimary: {
    type: Boolean,
    default: false,
  },
  addedOn: {
    type: Date,
    default: new Date().toISOString(),
  },
  updatedOn: {
    type: Date,
    default: new Date().toISOString(),
  }
});

module.exports = mongoose.model("Addresses", Address);
