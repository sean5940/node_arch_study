import { Container } from 'typedi';
import { EventSubscriber, On } from 'event-dispatch';
import events from './events';
import { Logger } from 'winston';
import { IMetadata } from '../interfaces/IMetadata';

@EventSubscriber()
export default class MedadataSubscriber {
  @On(events.metadata.save)
  public saveData(metadata: IMetadata) {
    const Logger: Logger = Container.get('logger');
    //TODO 음... 필요하다면..

  }

}
