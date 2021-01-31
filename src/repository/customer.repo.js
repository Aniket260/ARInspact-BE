const mongoose = require('mongoose');
const CustomerModel = mongoose.model('Customers');
const message = require("../constants/message");
let _this = (module.exports ={})
const ObjectID = require("mongodb").ObjectID;

_this.saveCustomer = (reqBody)=>{
    return new Promise((resolve, reject)=>{
        CustomerModel.create(reqBody).then((result)=>{
            return resolve(result);
        }).catch((err)=>{
            return reject(err);
        })
    })
};

_this.findCustomerById = (id)=>{
    return new Promise((resolve,reject)=>{
        CustomerModel.aggregate([
            {
              '$lookup':
              {
                from: "addresses",
                localField: "_id",
                foreignField: "customerId",
                as: "address"
              },
            },
            { "$match": { '_id': ObjectID(id) } }, 
          ]).then((result)=>{
            return resolve(result[0]);
        }).catch((err)=>{
            return reject(err);
        })
    })
};

_this.updateCustomerById = (id, reqBody)=>{
    return new Promise((resolve, reject)=>{
        CustomerModel.findByIdAndUpdate(id,reqBody).then((result)=>{
            return resolve(result);
        }).catch((err)=>{
            return reject(err);
        })
    })
};

_this.deleteCustomerById = (id)=>{
    return new Promise((resolve, reject)=>{
        CustomerModel.findByIdAndUpdate(id,{ isDeleted: true})
        .then((result)=>{
            //if(result.ok != 1){ return reject(message.unable_to_delete)}
            return resolve(result);
        }).catch((err)=>{
            return reject(err);
        })
    })
}

_this.filterCustomer = (search, pageSize, pageNumber)=>{
    return new Promise((resolve,reject)=>{
        const queryArray = 
        {$and: [ {$or:[
          { 'firstName': new RegExp(search, 'i') },
          { 'lastName': new RegExp(search, 'i') },
          { 'emailAddress': new RegExp(search, 'i') },
          { 'phoneNumber': new RegExp(search, 'i') },
          { 'address.addressLine1': new RegExp(search, 'i') },
          { 'address.addressLine2': new RegExp(search, 'i') },
          { 'address.city': new RegExp(search, 'i') },
          { 'address.state': new RegExp(search, 'i') },
          { 'address.country': new RegExp(search, 'i') }
        ]},  { 'isDeleted': false }]}
        CustomerModel.aggregate([
            {
              '$lookup':
              {
                from: "addresses",
                localField: "_id",
                foreignField: "customerId",
                as: "address"
              },
            },
            { "$match": queryArray }, 
          ])
          .skip((pageSize * pageNumber) - pageSize)
          .limit(pageSize)
          .then((result)=>{
              return resolve(result);
          }).catch((err)=>{
              return reject(err);
          })
    })
}

_this.totalCustomer = (search)=>{
    return new Promise((resolve,reject)=>{
    const queryArray = 
    {$and: [ {$or:[
      { 'firstName': new RegExp(search, 'i') },
      { 'lastName': new RegExp(search, 'i') },
      { 'emailAddress': new RegExp(search, 'i') },
      { 'phoneNumber': new RegExp(search, 'i') },
      { 'address.addressLine1': new RegExp(search, 'i') },
      { 'address.addressLine2': new RegExp(search, 'i') },
      { 'address.city': new RegExp(search, 'i') },
      { 'address.state': new RegExp(search, 'i') },
      { 'address.country': new RegExp(search, 'i') }
    ]},  { 'isDeleted': false }]}
    CustomerModel.aggregate([
        {
          '$lookup':
          {
            from: "addresses",
            localField: "_id",
            foreignField: "customerId",
            as: "address"
          },
        },
        { "$match": queryArray }, 
      ])
      .then((result)=>{
          return resolve(result);
      }).catch((err)=>{
          return reject(err);
      })
    })
}
