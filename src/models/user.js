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
  'totalDistance': { type: Number, default: 0 },
  'totalTime': { type: Number, default: 0 },
  'session': [{ type: String }],
  'trophies': [{ type: String }]

});

global.UserSchema = global.UserSchema || mongoose.model('User', UserSchema);

export default global.UserSchema;
