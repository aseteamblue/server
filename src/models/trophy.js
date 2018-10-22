'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Trophy = new Schema({
  'type': { type: Boolean },
  'description': { type: String },
  'challenge': { type: Number },
});

export default Trophy;
