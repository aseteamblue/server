'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  'thingyUri': { type: String },
  'lastName': { type: String },
  'firstName': { type: String },
  'address': { type: String },
  'username': { type: String },
  'password': { type: String },
  'totalDistanceJogging': { type: Number },
  'totalDistanceBicycle': { type: Number },
  'totalDistance': { type: Number },
  'totalTime': { type: Number },
  'session': [{ type: String }],
  'trophies': [{ type: String }]

});

global.UserSchema = global.UserSchema || mongoose.model('User', UserSchema);

export default UserSchema;
