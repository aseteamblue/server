import Router from 'koa-router';

import HomeController from './controllers/home';
import AuthController form './controllers/auth';


const router = new Router();
router.get('/', HomeController.getApiInfo);
router.get('/spec', HomeController.getSwaggerSpec);
router.post('/auth/login', AuthController.login);


export default router;
