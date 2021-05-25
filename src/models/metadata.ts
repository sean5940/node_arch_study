import { IMetadata } from '../interfaces/IMetadata';
import mongoose from 'mongoose';

const Metadata = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, 'Please enter a url'],
      lowercase: true,
      unique: true,
      index: true,
    },

    title: String,
    description: String,
    publisher: String,
    image: String
  },
  { timestamps: true },
);

export default mongoose.model<IMetadata & mongoose.Document>('Metadata', Metadata);
