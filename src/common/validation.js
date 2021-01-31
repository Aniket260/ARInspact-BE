const mongoose = require("mongoose");

const validation = {
    nameValidation: (name)=>{

    },

    emailAddress: (email) =>{

    },

    phoneNumber: (phone) =>{

    },

    IdValidation: (id) =>{
        const isValid = mongoose.Types.ObjectId.isValid(id);
        return isValid;
    }
}

module.exports = validation;