const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/db');

// config file
dotenv.config({path : './config/config.env'});

connectDb();

const app = express();

// body Parser
app.use(express.json());

// for corse
app.use(cors());

// user router
app.use('/api/v1/stores' , require('./routes/stores'));



const PORT = process.env.PORT || 5000;




app.listen(PORT , () => {
    console.log('Server Running on ' , PORT);
})