const message = require("../constants/message");
const AddressDB = require("../repository/address.repo");

// import validation
const validation = require("../common/validation");
const mongoose = require("mongoose");

//import Model
const AddressModel = mongoose.model('Addresses');

const AddressController = {
    
    deleteAddress : async(req,res)=>{
        try {
        let {addressId} = req.params;
         AddressDB.deleteAddress(addressId).then((result)=>{
             return res.status(200).json({success:true, message: message.record_deleted})
         }).catch((err)=>{
             return res.status(400).json({success: false, message: message.database_error, error: err})
         })
        } catch (error) {
            return res.status(500).json({success: false, message: message.internal_server_error})
        }
    },

    updateAddress: async(req, res) =>{
        try {
            const { addressId } = req.params;
            if (!validation.IdValidation(addressId)) { return res.status(400).json({ success: false, message: message.invalid_id }) }
            if(req.body.isPrimary && req.body.isPrimary == true){
                await AddressModel.updateOne({customerId: req.body.customerId, isPrimary: true}, {$set: {isPrimary: false}});
            }
            AddressDB.updateAddress(addressId, req.body).then(result =>{
                return res.status(200).json({
                    success: true,
                    message: message.record_updated
                  });
            })
            .catch(err=>{
                return res.status(400).json({
                    success: false,
                    message: message.unable_to_update
                  });
            })
 
        } catch (error) {
            return res.status(500).json({success: false, message: message.internal_server_error})
        }
    },

    addAddress: async(req,res) =>{
        try {
            const { customerId ,addressLine1, addressLine2, city, state, country, zipCode, isPrimary } = req.body;
            if (!validation.IdValidation(customerId)) { return res.status(400).json({ success: false, message: message.invalid_id }) }
            if(isPrimary == true){
                await AddressModel.findOneAndUpdate({customerId, isPrimary: true}, {$set: {isPrimary: false}});
            }
            AddressDB.saveAddress(req.body).then(result =>{
                return res.status(200).json({
                    success: true,
                    message: message.record_saved
                  });
            })
            .catch(err =>{
                return res.status(400).json({
                    success: false,
                    message: message.record_not_saved
                  });
            })
 
        } catch (error) {
            return res.status(500).json({success: false, message: message.internal_server_error})
        }
    }
}

module.exports = AddressController;