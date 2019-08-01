import { Request, Response } from "express";
import { UserObject, UserDocument, ACCOUNTROLES } from "../types/UserTypes";
import User from "../models/User";

/**
 * handle a user auth and requests
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
        let body: UserObject|null = req.body;
        // some validation of data and handle errors
        try {
            let newUserAccount: UserDocument = new User({
                ...body, 
                roles: ACCOUNTROLES.CUSTOMER 
            } as UserDocument);
            let isCreated = await newUserAccount.save();
            res.status( isCreated? 201 : 400).json({
                message: isCreated? 'User account created with success' : 'Something went wrong',
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

}

export default new UserController;