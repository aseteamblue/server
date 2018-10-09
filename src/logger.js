import { stdSerializers, createLogger } from 'bunyan';
import config from './config/logger';


const options = {
  ...config,
  serializers: stdSerializers
};
const logger = createLogger(options);
export default logger;
