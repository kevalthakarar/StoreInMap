const express = require('express');
const router = express.Router();
const { getStores, addStores , postStores}  = require('../controller/stores');


router.route('/').get(getStores).post(addStores);
router.route('/langLat').post(postStores)
module.exports = router;