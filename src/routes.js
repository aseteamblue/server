'use strict';

import Router from 'koa-router';

import HomeController from './controllers/home';


const router = new Router();
router.get('/', HomeController.getApiInfo);
router.get('/spec', HomeController.getSwaggerSpec);

export default router;
