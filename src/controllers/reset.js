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
  await zenio.get(`${config.host}:${config.port}/auth/register?username=test`);

  ctx.status = 200;
};

export default {
  reset
};
