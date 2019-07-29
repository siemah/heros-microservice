import { Schema, model, Document } from 'mongoose';

export type CustomerDocument = Document & {
  fullname: {type:String, require: true, };
  email: {type:String, require: true, };
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