'use strict';
import User from '../models/user';
import Session from '../models/session';
import Trophy from '../models/trophy';

const getUsers = async (ctx) => {
  await User.find({}, (err, res) => {
    if (err) { throw err; }
    if (res) {
      ctx.body = res;
      ctx.status = 200;
    }
  });
};

const getUserByID = async (ctx) => {
  const userID = ctx.params.userID;
  if (userID == null) {
    ctx.body = {
      msg: 'No field userID'
    };
    ctx.status = 400;
  }
  await User.findOne({ _id: userID }, (err, res) => {
    if (err) { throw err; }
    if (res) {
      ctx.body = res;
      ctx.status = 200;
    }
  });
};

const getUserSessions = async (ctx) => {
  const userID = ctx.params.userID;
  if (userID == null) {
    ctx.body = {
      msg: 'No field userID'
    };
    ctx.status = 400;
  }
  await User.findOne({ _id: userID })
    .then((user) => {
      return Session.find({ session: user.session });
    })
    .then((res) => {
      ctx.body = res;
      ctx.status = 200;
    });
};

const getUserTrophies = async (ctx) => {
  const userID = ctx.params.userID;
  if (userID == null) {
    ctx.body = {
      msg: 'No field userID'
    };
    ctx.status = 400;
  }
  await User.findOne({ _id: userID })
    .then((user) => {
      // TODO
      return Trophy.find({ trophies: user.trophies });
    })
    .then((res) => {
      ctx.body = res;
      ctx.status = 200;
    });
};
