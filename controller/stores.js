const Store = require('../models/Store');


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