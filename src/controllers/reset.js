import config from '../config';
import '../models/session';
import '../models/thingy';
import '../models/user';
import zenio from 'zenio';
/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Public
 *     summary: Reset the database.
 *     operationId: reset
 *     responses:
 *       200:
 *         description: Database deleted.
 */
const reset = async (ctx) => {
  await global.UserSchema.deleteMany({});
  await global.ThingySchema.deleteMany({});
  await global.SessionSchema.deleteMany({});
  await global.TrophySchema.deleteMany({});
  for(let i = 1; i <= 3; i++) {
    await zenio.get(`${config.host}:${config.port}/auth/register?username=test${i}&thingy=blue0${i}`);
  }

  ctx.status = 200;
};

const trophies = async (ctx) => {
  
};

export default {
  reset
};
