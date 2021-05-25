import { Document, Model } from 'mongoose';
import { IMetadata } from '../../interfaces/IMetadata';
declare module global {
  export namespace Models {
    export type MetadataModel = Model<IMetadata & Document>;
  }
}
