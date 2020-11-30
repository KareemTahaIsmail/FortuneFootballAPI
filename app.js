const express = require('express');
require('dotenv').config({path:__dirname+'/main.env'})
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const playerRoutes = require('./routes/players');
const userRoutes = require('./routes/users');
const cors = require('cors');
const app = express();


//CORS
app.use(cors());


const myPass = process.env.mongodb_pass;

mongoose.connect("mongodb+srv://root:"+myPass+"@cluster0.q142d.mongodb.net/fortune_football?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Middleware
app.use('/players', playerRoutes);
app.use('/users', userRoutes);

//Handling errors
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next)=> {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})



module.exports = app;