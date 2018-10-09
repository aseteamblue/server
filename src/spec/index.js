import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import pkginfo from '../../package.json';


// Options for the swagger specification
// Import the swagger definitions
const swaggerDefinition = {
  info: {
    title: pkginfo.name,
    description: pkginfo.description,
    version: pkginfo.version,
    contact: pkginfo.author
  },
  schemes: ['http', 'https'],
  consumes: [
    'application/json'
  ],
  produces: ['application/json'],
  securityDefinitions: {
    'Authorization': {
      in: 'header',
      type: 'apiKey',
      name: 'Authorization',
      description: 'The credentials to authenticate a user'
    }
  }
};
const options = {
  swaggerDefinition,
  apis: [
    path.join(__dirname, '../controllers/**/*.js'),
    path.join(__dirname, './definitions.yaml'),
    path.join(__dirname, './parameters.yaml'),
    path.join(__dirname, './responses.yaml'),
    path.join(__dirname, './tags.yaml')
  ],
};
const spec = swaggerJSDoc(options);

export default spec;
