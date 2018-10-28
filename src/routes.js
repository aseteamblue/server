import Router from 'koa-router';
import passport from 'koa-passport';
import HomeController from './controllers/home';
import AuthController from './controllers/auth';
import UserController from './controllers/user';
import SessionController from './controllers/session';
import TrophyController from './controllers/trophy';

const requireAuth = passport.authenticate('jwt', { session: false });

const router = new Router();
router.get('/', requireAuth, HomeController.getApiInfo);
router.get('/spec', HomeController.getSwaggerSpec);
router.get('/users/', UserController.getUsers);
router.get('/users/:userID', UserController.getUserByID);
router.get('/users/:userID/sessions/', UserController.getUserSessions);
router.get('/users/:userID/trophies/', UserController.getUserTrophies);
router.get('/sessions/', SessionController.getSessions);
router.get('/sessions/:sessionID', SessionController.getSessionByID);
router.get('/sessions/:sessionID/temperatures/', SessionController.getSessionTemperatures);
router.get('/sessions/:sessionID/humidities/', SessionController.getSessionHumidities);
router.get('/sessions/:sessionID/co2/', SessionController.getSessionCO2);
router.get('/sessions/:sessionID/gps/', SessionController.getSessionGPS);
router.get('/sessions/:sessionID/averageValues/', SessionController.getSessionAverageValues);
router.get('/trophies/', TrophyController.getTrophies);
router.get('/trophies/:trophyID', TrophyController.getTrophyByID);
router.post('/auth/login', AuthController.login);
router.get('/auth/register', AuthController.register);

export default router;
