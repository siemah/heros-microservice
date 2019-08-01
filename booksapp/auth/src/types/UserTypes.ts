import { Document } from "mongoose";

/**
 * some types for user model and schema
 * @author siemah
 * @version 1.0.0
 * @see mongoose doc
 */

// user object 
export interface UserObject {
    email: string;
    password: string;
    fname?: string;
    lname?: string;
    hashPassword?: (password: string) => string;
    roles: ACCOUNTROLES
}
// user roles enum type
export enum ACCOUNTROLES {ADMIN="admin", CUSTOMER="customer"};
// user document contain userObject props and mongoose.Document
export type UserDocument = Document & UserObject;