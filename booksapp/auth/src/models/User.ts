import { Schema, model } from 'mongoose';
import { UserDocument, ACCOUNTROLES } from '../types/UserTypes';

/**
 * userschema and model
 * @author siemah
 * @version 1.0.0
 * @see mongoose doc
 */
let UserSchema: Schema<any> = new Schema({
    fname: { type: String, required: false, default: null,  },
    lname: { type: String, required: false, default: null },
    email: { type: String, required: [true, "Email is required"], index: true },
    password: { type: String, required: [true, "Password is required"] },
    salt: { type: String, required: [true, "Salt is forgtten"] },
    roles: { type: String, required: true, default: 'customer'},
});

export default model<UserDocument>('User', UserSchema);