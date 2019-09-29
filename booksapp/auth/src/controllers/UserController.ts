import { Request, Response, NextFunction } from "express";
import { UserObject, UserDocument, ACCOUNTROLES, UserCredentials, UserProjection } from "../types/UserTypes";
import User from "../models/User";
import { encodeJWTToken, passwordHash, genSalt, passwordVerify, decodeJWTToken } from "../utils/tools";

/**
 * handle a user auth and incoming requests for authentication
 * @author siemah
 * @version 1.0.0
 * @see mongoose doc
 */
class UserController {

    /**
     * handle route of creating a new user account
     * @param req Request
     * @param res Response
     * @return Promise<any>
     */
    async createUserAccount(req: Request, res: Response): Promise<any>{
        let body: UserObject = req.body;
        // some validation of data and handle errors
        if(!body) res.status(400).json({status: 'NO', message: "Try to send some required data"});
        try {
            let salt: string = await genSalt(64);
            let password: string = await passwordHash(body.password, salt);
            let newUserAccount: UserDocument = new User({
                ...body, 
                password: password,
                salt,
                roles: ACCOUNTROLES.CUSTOMER 
            } as UserDocument);
            let { _id, email, roles, fname, lname, } = await newUserAccount.save();
            let token:string = await encodeJWTToken({ email, fullname: `${fname} ${lname}`, id: _id, roles }, process.env.TOKEN_SECRET as string)
            res.status( _id? 201 : 400).json({
                status: _id? 'OK' : 'NO',
                message: _id? 'User account created with success' : 'Something went wrong',
                user:{
                    token,
                    id: _id,
                    fullname: `${fname} ${lname}`,
                    email,
                },
            });
        } catch (error) {
            console.log((error))
            throw new Error(error);
        }
    }

    /**
     * handle route of retrieving all users accounts
     * @param req Request
     * @param res Response
     * @return Promise<any>
     */
    async getAllUserAccount(req: Request, res: Response): Promise<any>{
        let accounts: Array<UserDocument|null>;
        // some validation of data and handle errors
        try {
            accounts = await User.find({});
            res.status( accounts.length? 200 : 404).json({
                length: accounts.length,
                accounts,
            });
        } catch (error) {
            console.log((error))
            throw new Error(error);
        }
    }
    
    /**
     * verify if user is has the right credentials
     * @param credentials UserCredentials the user credentials sended
     * @return Promise<any>
     */
    protected async verifyUserCredentials(credentials: UserCredentials|null): Promise<any> {
        if(!credentials || !Object.keys(credentials as object).length) 
            return { status: 404, message: "Credentials are empty" };
        try {
            let projections:UserProjection = {email: 1, password: 1, salt: 1, fname: 1, lname: 1};
            let user = await User.findOne({ email: credentials.email }, projections);
            if(!user) 
                return { status: 404, message: "Account don't exist yet", };
            else if( !await passwordVerify(credentials.password, user.password, user.salt) )
                return { status: 404, message: "Incorrect password", };
            else 
                return { 
                    status:200, 
                    user: { 
                        id: user._id,
                        email: user.email, 
                        fullname: `${user.fname} ${user.lname}`
                    }, 
                };
        } catch (error) {
            return { status: 400, message: error.message ? error.message : "Incorect credentials" };
        }
    }

    /**
     * handle the incoming login requests
     */
    login = async (req: Request, res: Response):Promise<any> => {
        let credentials: UserCredentials|null = req.body;
        if(!Object.keys(credentials as object).length) 
            return res.status(404).json({message: "Credentials are invalid"});
        try {
            let _res = await this.verifyUserCredentials(credentials);
            if(_res.status === 200) {
                let { email, fullname, id, roles } = _res.user;
                let token:string = await encodeJWTToken({ email, fullname, id, roles }, process.env.TOKEN_SECRET as string)
                _res.user['token'] = token;
            }
            return res.status(_res.status).json(_res);
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                message: "retry to generate a token ->" + error.message,
            });
        }
    }

    /**
     * get user roles
     * @param req Request
     * @param res Response
     */
    async getUserRoles (req: Request, res: Response):Promise<any> {
        if( !('email' in req.body && 'roles' in req.body) )
            return res.status(404).json({message: 'User dont exist' });
        try {
            let user = await User.find({ 
                $and: [
                    {email: req.body.email}, 
                    {roles: req.body.roles},
                ]
            });
            if( user.length ) 
                res.status(200).json({ roles: user[0].roles });
            else
                res.status(404).json({message: 'User dont exist' });
        } catch (error) {
            res.status(404).json({message: 'User dont exist' });
        }
    }

}

export default new UserController;