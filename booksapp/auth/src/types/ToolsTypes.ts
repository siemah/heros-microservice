import { Secret, SignOptions } from "jsonwebtoken";

// encode jwt token function shape
export interface EncodeJWTToken {
    (payload: object, secret:Secret, options?: SignOptions): Promise<string>
}
// generate a salt function
export interface GenerateSalt {
    (length: number):Promise<string>;
}
// hash password options
export interface PasswordHashOptions {
    iterations: number;
    keylen: number;
    digest: string;
}
// return object contain 2 key for hashing the password
export interface PasswordHashReturnToRemove {
    password: string;
    salt: string;
}
// password hash function shape
export interface PasswordHash {
    (password: string, salt: string, options?: PasswordHashOptions):Promise<string>;
}
// passwor verify function shape
export interface PasswordVerify{
    (password: string, passwordSave: string, salt: string):Promise<boolean>;
}