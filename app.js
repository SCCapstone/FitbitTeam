const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Activity = require('./models/activity');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

mongoose.Promise = require('bluebird')
mongoose.connect('mongodb+srv://mongoUser:12345@cluster0-umioi.mongodb.net/test?retryWrites=true&w=majority');
app.use(function(req, res){
    console.log('we use router, next moves to next request');
    next();
})

//GET Method
app.get('/api/activities', function(req, res){
    console.log('get activities');
    Activity.find({}).then(eachOne =>{
        res.json(eachOne);
    })
})

//More methods to come below