const express = require('express');
const router = express.Router();

const addressController = require('../controllers/address.controller');

router.route("/address").post(addressController.addAddress);

router.route("/address/:addressId").put(addressController.updateAddress);

router.route("/address/:addressId").delete(addressController.deleteAddress);

module.exports = router;