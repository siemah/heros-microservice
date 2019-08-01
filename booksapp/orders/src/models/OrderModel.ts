import { Schema, model, Document } from 'mongoose';

/**
 * order model using a mongoose ORM
 * @author siemah
 * @version 1.0.0
 * @see mongoose doc for Schema and model
 */

export interface OrderParams {
    customer: Schema.Types.ObjectId;
    book: Schema.Types.ObjectId;
    returnAt: Date;
    dueDate: Date;
};
// order document type 
export type OrderDocument = Document & OrderParams;
// order schema
let OrderSchema = new Schema(
    {
        customer: { type: Schema.Types.ObjectId, required: true },
        book: { type: Schema.Types.ObjectId, required: true },
        dueDate: { type: Date, default: Date.now() + 3600 * 1000 * 24 * 7 },
        returnAt: { type: Date, },
    }, 
    {
        timestamps: true,
    }
);

export default model<OrderDocument>("order", OrderSchema);
