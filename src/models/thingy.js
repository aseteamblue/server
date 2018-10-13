'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/*
* This shema is use to store the message receive from the mqtt borker
*/
const Thingy = new Schema({
  'device_id': { type: String },
  'message_type': { type: String },
  'data': { type: String },
  'date': { type: Date, default: Date.now },

});

Thingy.path('message_type').set((value) => {
  const type = value.toString();
  switch(type) {
    case 'ef680201-9b35-4933-9b10-52ffa9740042':
      return 'temperature';
    case 'ef680202-9b35-4933-9b10-52ffa9740042':
      return 'pressure';
    case 'ef680203-9b35-4933-9b10-52ffa9740042':
      return 'humidity';
    case 'ef680204-9b35-4933-9b10-52ffa9740042':
      return 'gas';
    case 'ef680205-9b35-4933-9b10-52ffa9740042':
      return 'light';
    case 'ef680302-9b35-4933-9b10-52ffa9740042':
      return 'button';
    case 'ef68040a-9b35-4933-9b10-52ffa9740042':
      return 'gravity_vector';
    default:
      return 'NotAValideType';
  }
});

const model = mongoose.model('Thingy', Thingy);
export default model;
