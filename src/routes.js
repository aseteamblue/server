import Router from 'koa-router';
import passport from 'koa-passport';
import HomeController from './controllers/home';
import AuthController from './controllers/auth';
import UserController from './controllers/user';
import SessionController from './controllers/session';
import TrophyController from './controllers/trophy';
import RestController from './controllers/reset';

const requireAuth = passport.authenticate('jwt', { session: false });

const router = new Router();
router.get('/', requireAuth, HomeController.getApiInfo);
router.get('/spec', requireAuth, HomeController.getSwaggerSpec);
router.get('/users', requireAuth, UserController.getUsers);
router.get('/user', requireAuth, UserController.getUserByID);
router.get('/user/sessions', requireAuth, UserController.getUserSessions);
router.get('/user/trophies', requireAuth, UserController.getUserTrophies);
router.post('/sessions', requireAuth, SessionController.postSession);
router.get('/sessions', requireAuth, SessionController.getSessions);
router.get('/sessions/:sessionID', requireAuth, SessionController.getSessionByID);
router.get('/sessions/:sessionID/privacy', requireAuth, SessionController.changePrivacy);
router.get('/sessions/:sessionID/temperatures', requireAuth, SessionController.getSessionTemperatures);
router.get('/sessions/:sessionID/humidities', requireAuth, SessionController.getSessionHumidities);
router.get('/sessions/:sessionID/co2', requireAuth, SessionController.getSessionCO2);
router.get('/sessions/:sessionID/gps', requireAuth, SessionController.getSessionGPS);
router.get('/sessions/:sessionID/averageValues', requireAuth, SessionController.getSessionAverageValues);
router.get('/trophies', requireAuth, TrophyController.getTrophies);
router.get('/trophies/:trophyID', requireAuth, TrophyController.getTrophyByID);
router.post('/auth/login', AuthController.login);
router.get('/auth/register', AuthController.register);
router.get('/auth/refresh', requireAuth, AuthController.refresh);
router.get('/reset', RestController.reset);

export default router;
