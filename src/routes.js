import Router from 'koa-router';

import HomeController from './controllers/home';
import AuthController from './controllers/auth';


const router = new Router();
router.get('/', HomeController.getApiInfo);
router.get('/spec', HomeController.getSwaggerSpec);
router.get('/users/');
router.get('/users/:userID', '');
router.get('/users/:userID/sessions/', '');
router.get('/users/:userID/trophies/', '');
router.get('/sessions/', '');
router.get('/sessions/:sessionID', '');
router.get('/sessions/:sessionID/temperatures/', '');
router.get('/sessions/:sessionID/humidities/', '');
router.get('/sessions/:sessionID/co2/', '');
router.get('/sessions/:sessionID/gps/', '');
router.get('/sessions/:sessionID/averageValues/', '');
router.get('/trophies/', '');
router.get('/trophies/:trophyID', '');

router.post('/auth/login', AuthController.login);


export default router;
