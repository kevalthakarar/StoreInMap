const NodeGeocoder = require('node-geocoder');

const options = {
  provider: process.env.geoCodeProvider,
  httpAdapter : 'https',
  apiKey: process.env.geoCoderAPIKey,
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;