const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

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
            formattedAddress : String,
    },

    createdAt : {
        type : Date,
        default : Date.now()
    }
})

//geoCoder

storeSchema.pre('save' , async function(next){
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type : ['Point'],
        coordinates : [loc[0].longitude , loc[0].latitude],
        formattedAddress : loc[0].formattedAddress
    }

    this.address = undefined;
    next();
});



module.exports = mongoose.model('Store' , storeSchema);