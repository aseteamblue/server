'use strict';
import Trophy from '../models/trophy';

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Public
 *     summary: Get all the trophies from the database.
 *     operationId: getTrophies
 *     responses:
 *       200:
 *         description: List of trophies.
 */
const getTrophies = async (ctx) => {
  let trophies = await Trophy.find({});
  if (trophies) {
    ctx.body = trophies;
    ctx.status = 200;
  }
};

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Public
 *     summary: Get a trophy corresponding to a given ID.
 *     operationId: getTrophy
 *     responses:
 *       200:
 *         description: Trophy.
 */
const getTrophyByID = async (ctx) => {
  const trophyID = ctx.params.trophyID;
  if (trophyID == null) {
    ctx.body = {
      msg: 'No field userID'
    };
    ctx.status = 400;
  }
  let trophy = await Trophy.findOne({ _id: trophyID });
  if (trophy) {
    ctx.body = trophy;
    ctx.status = 200;
  }
};

export default{
  getTrophies,
  getTrophyByID
};
