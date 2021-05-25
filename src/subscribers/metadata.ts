import { Container } from 'typedi';
import { EventSubscriber, On } from 'event-dispatch';
import events from './events';
import { IMetadata } from '../interfaces/IMetadata';
import mongoose from 'mongoose';
import { Logger } from 'winston';

@EventSubscriber()
export default class MedadataSubscriber {
  @On(events.metadata.save)
  public savaData(url: string) {
    const Logger: Logger = Container.get('logger');


  }

}
