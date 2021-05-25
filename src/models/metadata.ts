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
    image: String,
  },
  {
    toObject: {
      transform: function (doc, ret) {
        // delete ret._id;
        // delete ret.__v;
        // delete ret.createdAt;
        // delete ret.updatedAt;

        return {'date': doc.updatedAt,
        'description' : doc.description,
        'image' : doc.image,
        'publisher' : doc.publisher,
        'title' : doc.title,
        'url' : doc.url}
      }
    }, timestamps: true
  },
);

export default mongoose.model<IMetadata & mongoose.Document>('Metadata', Metadata);
