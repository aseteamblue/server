'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Thingy = new Schema({
    "device_id": {type: String},
    "message_type": {type: String},
    "data": {type: String},
    "date": {type: Date, default: Date.now},

});

Thingy.path('message_type').set( (value) =>{
    type = value.toString();
    switch(type){
        case "ef680201-9b35-4933-9b10-52ffa9740042":
            return "temperature";
        default:
            return "NotAValideType";
    }
});

const model = mongoose.model('Thingy', Thingy);
module.exports = model;