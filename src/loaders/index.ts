import expressLoader from './express';
import mongooseLoader from './mongoose';
import Logger from './logger';
//We have to import at least all the events once so they can be triggered
import './events';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('DB loaded and connected!');

  Logger.info('Dependency Injector loaded');

  await expressLoader({ app: expressApp });
  Logger.info('Express loaded');
};
