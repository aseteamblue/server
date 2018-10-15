'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Trophy = new Schema({
  'type': { type: Boolean },
  'description': { type: String },
  'challenge': { type: Number },
});

<<<<<<< HEAD
=======
global.trophySchema = global.trophySchema || mongoose.model('Trophy', Trophy);

>>>>>>> mongodb
export default Trophy;
