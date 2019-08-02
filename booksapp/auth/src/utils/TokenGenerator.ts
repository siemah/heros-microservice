import jwt, { Secret, SignOptions } from 'jsonwebtoken';

/**
 * generate a JWT token for users
 * @author siemah   
 * @version 1.0.0
 * @see jsonwebtoken
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
})