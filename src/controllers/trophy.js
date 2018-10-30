'use strict';
import Trophy from '../models/trophy';

const getTrophies = async (ctx) => {
  await Trophy.find({}, (err, res) => {
    if (err) { throw err; }
    if (res) {
      ctx.body = res;
      ctx.status = 200;
    }
  });
};

const getTrophyByID = async (ctx) => {
  const trophyID = ctx.params.trophyID;
  if (trophyID == null) {
    ctx.body = {
      msg: 'No field userID'
    };
    ctx.status = 400;
  }
  await Trophy.findOne({ _id: trophyID }, (err, res) => {
    if (err) { throw err; }
    if (res) {
      ctx.body = res;
      ctx.status = 200;
    }
  });
};
