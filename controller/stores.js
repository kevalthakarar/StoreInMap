const Store = require('../models/Store');
const geocoder = require('../utils/geocoder');

/**
 * 
 * Get ALl the Stores 
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

exports.getStores = async (req , res , next) => {   

    try {
        const stores = await Store.find({});

        res.status(200).json({
            success : true,
            count : stores.length,
            data : stores
        })

    }catch(err){
        res.status(500).json({
            success : false,
            error : err.message
        })
    }

}


/**
 * 
 * POst request to Add Stores
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */


exports.addStores = async (req , res , next) => {   

    try {
        const store = await Store.create(req.body);

        res.status(200).json({
            success : true,
            data : store
        })

    }catch(err){
        res.status(500).json({
            success : false,
            error : err.message
        })
    }

}

exports.postStores = async (req , res , next) => {

    const loc = {
        lat : req.body.lang,
        lon : req.body.lati
    }
    const ad = await geocoder.reverse(loc);
    
    req.body.address = ad[0].formattedAddress;
    req.body.location = {
        coordinates : [loc.lat , loc.lon]
    }

    reqBody = {
        storeId : req.body.storeId,
        address : req.body.address,
        location : req.body.location
    }

    try {
        const store = await Store.create(reqBody);

        res.status(200).json({
            success : true,
            data : store
        })

    }catch(err){
        res.status(500).json({
            success : false,
            error : err.message
        })
    }
}