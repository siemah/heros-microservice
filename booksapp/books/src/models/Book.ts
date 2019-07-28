import { Schema, model } from 'mongoose';
import { BookDocument } from '../types/book';

let BookSchema = new Schema(
  {
    title: { type: String, required: true, lowercase: true },
    isbn: { type: Number, required: true},
    description: { type: String, default: "" },
  }, 
  {
    timestamps: true,
  }
);

export default model<BookDocument>('Book', BookSchema);
