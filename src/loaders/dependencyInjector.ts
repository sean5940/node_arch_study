import { Container } from 'typedi';
import formData from 'form-data';
import LoggerInstance from './logger';
import config from '../config';

export default ({ mongoConnection, models }: { mongoConnection; models: { name: string; model: any }[] }) => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
    });

    Container.set('logger', LoggerInstance);
    LoggerInstance.info('✌️ injected into container');

  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
