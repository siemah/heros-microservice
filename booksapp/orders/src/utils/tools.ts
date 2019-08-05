import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import { GenerateSalt, PasswordHash, PasswordHashOptions, PasswordVerify, EncodeJWTToken, VerifyToken } from '../types/ToolsTypes';
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
export const encodeJWTToken: EncodeJWTToken = (payload, secret, options={}) => new Promise((resolve, reject ) => {
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
 * verify if the jwt token is valide and then decode it
 * @param token string the received token
 * @param secret string the secret value used to generate a jwt token
 * @return Promise<string|object> the result of decode
 * 
 */
export const decodeJWTToken = (token:string, secret:string|Buffer): Promise<string|object> => {
    return new Promise ((resolve, reject) => {
        if(!token || !token.trim().length) reject('Invalid token');
        jwt.verify(token, secret, (err, decoded) => {
            if(err) reject(err.message);
            resolve(decoded);
        });
    })
}
/**
 * verify if the token is valide and not expired sended using authorization header
 * @param headers Request.headers represent a list of headers in Request object
 */
export const verifyToken:VerifyToken = (headers) => {
    return new Promise(async (resolve, reject) => {
        let authorizationSplited: Array<any> = headers.authorization? headers.authorization.split(' ') : [];
        if(!authorizationSplited.length) 
            reject ({
                status: 401,
                message: "Invalid token",
            });
        // maybe check if the type of authorization if Bearer or JWT
        try {
            let jwtDecoded = await decodeJWTToken(authorizationSplited[1], process.env.TOKEN_SECRET as string);
            resolve({
                status: 202,
                results: jwtDecoded,
            })
        } catch (error) {
            reject ({
                status: 401,
                message: error,
            });
        }
    })
}

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

// password hash option default value
export const passwordHashOptions: PasswordHashOptions = {
    iterations: 1000, 
    keylen: 60, 
    digest: 'sha512',
};

/** 
 * hash the password
 * @param password string the password to hash
 * @param salt string the salt of the hashing
 * @param options PasswordHashOptions some extra options for more see crypto.pdkdf2
 * @see crypto node native module
 * @return Promise<string>
 */
export const passwordHash:PasswordHash = (password, salt, options=passwordHashOptions) => new Promise((resolve, reject) => {
    if(!password.trim().length || !salt.trim().length)
        reject("Password and salt are required to hash a hash password");
    crypto.pbkdf2(
        password, salt, 
        options.iterations, 
        options.keylen, 
        options.digest, 
        (err:any, derivedKey: Buffer) => {
            if(err) reject(err.message);
            resolve(derivedKey.toString('hex'));
        });
});

/**
 * verify if password is the same as the passwordSaved(in DB)
 * @param password string sended by user
 * @param passwordSave string this the password saved in DB
 * @param salt the salt either saved in DB  
 */
export const passwordVerify:PasswordVerify = (password, passwordSave, salt) => {
    return new Promise((resolve, reject) => {
        if(!password.trim().length || !salt.trim().length)
            reject(false);
        passwordHash(password, salt)
            .then(passwordHashed => {
                resolve(passwordHashed === passwordSave);
            })
            .catch(err => reject(false));
    });
}