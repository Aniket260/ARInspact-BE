const mongoose = require('mongoose');
const AddressModel = mongoose.model('Addresses');

let _this = (module.exports = {});

_this.saveAddress = (reqBody)=>{
    return new Promise((resolve, reject)=>{
        AddressModel.create(reqBody).then((result)=>{
            return resolve(result);
        }).catch((err)=>{
            return reject(err);
        })
    })
};

_this.updateAddress = (id , reqBody)=>{
    return new Promise((resolve, reject)=>{
        AddressModel.findByIdAndUpdate(id, reqBody)
        .then((result)=>{
            return resolve(result);
        }).catch((err)=>{
            return reject(err);
        })
    })
}

_this.deleteAddress = (id)=>{
    return new Promise((resolve,reject)=>{
        AddressModel.findByIdAndDelete(id)
        .then((result)=>{
            return resolve(result);
        }).catch((err)=>{
            return reject(err);
        })
    })
}

_this.deleteAddressByCustomerId = (customerId)=>{
    return new Promise((resolve,reject)=>{
        AddressModel.deleteMany({customerId: customerId}).then((result)=>{
            return resolve(result);
        }).catch((err)=>{
            return reject(err)
        })
    })
}

_this.getAddressList = ()=>{
    return new Promise((resolve, reject)=>{
        AddressModel.find().then((result)=>{
            return resolve(result);
        }).catch((err)=>{
            return reject(err);
        })
    })
}

_this.getAddressById = (id)=>{
    return new Promise((resolve, reject)=>{
        AddressModel.findById(id).then((result)=>{
            return resolve(result);
        }).catch((err)=>{
            return reject(err);
        })
    })
}

_this.insertMultipleAddress =(reqBody)=>{
  return new Promise((resolve,reject)=>{
      AddressModel.insertMany(reqBody).then((result)=>{
          return resolve(result);
      }).catch((err)=>{
          return reject(err)
      })
  })
}
