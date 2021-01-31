const mongoose = require("mongoose");
const ObjectID = require("mongodb").ObjectID;

// import DB Model
const CustomerModel = mongoose.model("Customers");
const AddressModel = mongoose.model("Addresses");
const CustomerDB = require("../repository/customer.repo");
const AddressDB = require("../repository/address.repo");

// import validation
const validation = require("../common/validation");

// import constants messages
const message = require("../constants/message");

const customerController = {
  addCustomer: async (req, res) => {
    try {
      let { firstName, lastName, emailAddress, phoneNumber, addressLine1, addressLine2, city, state, country, zipCode } = req.body;
      const customerObj = { firstName, lastName, emailAddress, phoneNumber };
      CustomerDB.saveCustomer(customerObj).then((customer) => {
        const addressObj = { customerId: customer._id, addressLine1, addressLine2, city, state, country, zipCode, isPrimary: true };
        AddressDB.saveAddress(addressObj).then((address) => {
          return res.status(201).json({ success: true, message: message.record_saved })
        }).catch((err) => { return res.status(400).json({ success: false, message: message.database_error, error: err }); });
      }).catch((err) => {
        return res.status(400).json({ success: false, message: message.database_error, error: err });
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: message.internal_server_error });
    }
  },

  editCustomer: async (req, res) => {
    try {
      let { firstName, lastName, emailAddress, phoneNumber } = req.body;
      let { customerId } = req.params;
      if (!validation.IdValidation(customerId)) { return res.status(400).json({ success: false, message: message.invalid_id }) }
      let customer = await CustomerModel.findOne({_id: customerId});
      if (!customer) { return res.status(400).json({ success: false, message: message.customer_not_found }) }
      if (emailAddress !== '' && emailAddress !== null && emailAddress !== undefined) {
        const validateEmail = await CustomerModel.findOne({ emailAddress, _id: { $ne: ObjectID(customerId) } });
        if (validateEmail) {
          return res.status(400).json({
            message: 'Email is already in use from another account'
          })
        }
      }
      if (phoneNumber !== '' && phoneNumber !== null && phoneNumber !== undefined) {
        const validatePhone = await CustomerModel.findOne({ phoneNumber, _id: { $ne: ObjectID(customerId) } });
        if (validatePhone) {
          return res.status(400).json({
            message: 'Phone number is already in use from another account'
          })
        }
      }
      const customerObj = {
        firstName: firstName ? firstName : CustomerDetails.firstName,
        lastName: firstName ? lastName : CustomerDetails.lastName,
        emailAddress: emailAddress ? emailAddress : CustomerDetails.emailAddress,
        phoneNumber: phoneNumber ? phoneNumber : CustomerDetails.phoneNumber,
        updatedOn: Date.now()
      }
      CustomerDB.updateCustomerById(customerId, customerObj).then(result =>{
        return res.status(200).json({
          success: true,
          message: message.record_updated
        });
      })
      .catch(err=>{
        return res.status(400).json({
          success: true,
          message: message.unable_to_update
        });
      })
    } catch (error) {
      return res.status(500).json({
        success: true,
        message: message.internal_server_error
      });
    }
  },

  filerCustomer: async (req, res) => {
    try {
      let { pageNumber, pageSize, text } = req.query;
      if(!text){
        text = '';
      }
        CustomerDB.filterCustomer(text, parseInt(pageSize), parseInt(pageNumber)).then((customerList)=>{
          const total = CustomerDB.totalCustomer(text).then(totalCustomer=>{
            return res.status(200).json({ success: true,customerList , total: totalCustomer.length})
          }).catch((countError)=>{
            return res.status(400).json({success: false, message: message.database_error, error: err})
          })
        }).catch((err)=>{
          return res.status(400).json({success: false, message: message.database_error, error: err})
        })

    } catch (error) {
      return res.status(500).json({ success: false, message: message.internal_server_error });
    }
  },

  deleteCustomer: async (req, res) => {
    try {
      const { customerId } = req.params;
      if (!validation.IdValidation(customerId)) { return res.status(400).json({ success: false, message: message.invalid_id }); }

      CustomerDB.deleteCustomerById(customerId).then(result=>{
        return res.status(200).json({ success: true, message: message.record_deleted });
      })
      .catch(err=>{
        return res.status(400).json({ success: false, message: message.unable_to_delete });
      })
      
    } catch (error) {
      return res.status(500).json({ success: false, message: message.internal_server_error });
    }
  },

  getCustomerById: async (req, res) => {
    try {
      const { customerId } = req.query;
      if (!validation.IdValidation(customerId)) { return res.status(400).json({ success: false, message: message.invalid_id }); }

      let customer = await CustomerDB.findCustomerById(customerId);
      return res.status(200).json({ success: true, customer });

    } catch (error) { return res.status(500).json({ success: false, message: message.internal_server_error }); }
  },
};

module.exports = customerController;
