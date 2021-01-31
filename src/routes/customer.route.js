const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customer.controller');

router.route("/customer").post(customerController.addCustomer);

router.route("/customer/:customerId").put(customerController.editCustomer);

router.route("/customer").get(customerController.getCustomerById);

router.route("/customer/:customerId").delete(customerController.deleteCustomer);

router.route("/customer/filter").get(customerController.filerCustomer)

module.exports = router