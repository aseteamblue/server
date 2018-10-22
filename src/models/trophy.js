'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TrophySchema = new Schema({
  'type': { type: Boolean },
  'description': { type: String },
  'challenge': { type: Number },
});

global.TrophySchema = global.TrophySchema || mongoose.model('Trophy', TrophySchema);

export default TrophySchema;
