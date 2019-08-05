import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { EncodeJWTToken, VerifyToken } from '../types/ToolsTypes';
/**
 * @author siemah   
 * @version 1.0.0
 * @see jsonwebtoken
 */

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
