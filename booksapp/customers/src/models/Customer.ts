import { Schema, model, Document } from 'mongoose';

export type CustomerDocument = Document & {
  fullname: String;
  email: String;
}

const CustomerSchema: any = new Schema(
  {
    fullname: String,
    email: String,  
  }, 
  {
    timestamps: true
  }
);

export default model<CustomerDocument>("customer", CustomerSchema);