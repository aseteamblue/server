'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Trophy = new Schema({
  'type': { type: Boolean },
  'description': { type: String },
  'challenge': { type: Number },
});


const model = mongoose.model('Trophy', Trophy);
export default model;
