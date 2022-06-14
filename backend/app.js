const express = require('express')
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
dotenv.config({path : './.env'})
const morgan = require('morgan');
const app = express();

app.use(morgan('tiny'))

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());


//index Route
var indexRouter = require('./routes/index');
app.use('/api', indexRouter);


module.exports = app;
