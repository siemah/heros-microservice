import { Document } from "mongoose";

export interface BookDocument extends Document {
  title: string;
  isbn: number;
  description: string;
}