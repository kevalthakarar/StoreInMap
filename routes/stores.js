const express = require('express');
const router = express.Router();
const { getStores, addStores}  = require('../controller/stores');


router.route('/').get(getStores).post(addStores);

module.exports = router;