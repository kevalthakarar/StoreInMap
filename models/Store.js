const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    storeId : {
        type : String,
        required : [true , 'StoreId missing'],
        unique : true,
        trim : true
    },
    address :{
        type : String,
        required : [true , 'No Address Founded']
    },

    location: {
            type: {
                type: String, 
                enum: ['Point']
            },
            coordinates: {
                type: [Number],
                index : '2dsphere'
            },
            zipCode : String,
    },

    createdAt : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model('Store' , storeSchema);