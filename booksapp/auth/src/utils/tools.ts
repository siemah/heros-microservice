import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import { GenerateSalt, } from '../types/ToolsTypes';
/**
 * @author siemah   
 * @version 1.0.0
 * @see jsonwebtoken
 */

/**
 * generate a JWT token for users
 * @param payload object present a data to send in JWT
 * @param secret Secret the secret key 
 * @param options SignOptions list of options 
 */
export const generateJWTToken = (payload: object, secret:Secret, options: SignOptions={}): Promise<string> => new Promise((resolve, reject ) => {
    if(!payload) reject("Payload object is required to generate a valide token");
    if(!secret) reject("Secret key is required to generate a valide token");
    // modify sign options object and add
    options = Object.keys(options).length
        ? options  
        : { expiresIn: '2 days', };
    try {
        jwt.sign(payload, secret, options, (err: any, token: string) => {
            resolve(token);
        });
    } catch (error) {
        reject(error.message);
    }
});

/**
 * generate a salt
 * @see crypto native node module
 * @param length number represent the size of salt
 */
export const genSalt: GenerateSalt = (length:number) => new Promise((resolve, reject) => {
    if(length <1) reject('Length must be more than or equal to 1')
    let salt: string = crypto.randomBytes(length).toString('hex');
    resolve(salt);
});
