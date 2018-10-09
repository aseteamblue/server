'use strict';

import { name as _name, version as _version, description as _description, author as _author } from '../../package.json';
import spec from '../spec';


/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Public
 *     summary: Get API information.
 *     operationId: getApiInfo
 *     responses:
 *       200:
 *         description: Describe general API information
 */
const getApiInfo = (ctx) => {
  // BUSINESS LOGIC
  const data = {
    name: _name,
    version: _version,
    description: _description,
    author: _author
  };

  return ctx.res.ok({
    data,
    message: 'Hello, API!'
  });
};

/**
 * @swagger
 * /spec:
 *   get:
 *     tags:
 *       - Public
 *     summary: Get Open API specification.
 *     operationId: getSwaggerSpec
 *     responses:
 *       200:
 *         description: Describe Swagger Open API Specification
 */
const getSwaggerSpec = (ctx) => {
  ctx.body = spec;
};

export default {
  getSwaggerSpec,
  getApiInfo,
};
