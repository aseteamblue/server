
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const configs = {
  base: {
    env,
    name: process.env.APP_NAME || 'TeamBlue',
    host: process.env.APP_HOST || '0.0.0.0',
    port: 7070,
    jwt_secret: 'emf123'
  },
  production: {
    port: process.env.PORT || 80
  },
  development: {
  },
  test: {
    port: 7072,
  }
};
const config = Object.assign(configs.base, configs[env]);

export default config;
