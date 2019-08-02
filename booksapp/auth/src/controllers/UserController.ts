import { Request, Response } from "express";
import { UserObject, UserDocument, ACCOUNTROLES, UserCredentials, UserProjection } from "../types/UserTypes";
import User from "../models/User";
import { generateJWTToken } from "../utils/tools";

/**
 * handle a user auth and incoming requests for authentication
 * @author siemah
 * @version 1.0.0
 * @see mongoose doc
 */
class UserController {
    protected test: string = "test var";
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
    
    /**
     * verify if user is has the right credentials
     * @param credentials UserCredentials the user credentials sended
     * @return Promise<any>
     */
    protected async verifyUserCredentials(credentials: UserCredentials|null): Promise<any> {
        if(!credentials || !Object.keys(credentials as object).length) 
            return { status: 404, message: "Credentials are empty" };
        try {
            let projections:UserProjection = {email: 1, password: 1, fname: 1, lname: 1};
            let user = await User.findOne({ email: credentials.email }, projections);
            if(!user) 
                return { status: 404, message: "Account don't exist yet", };
            else if(user.password !== credentials.password) 
                return { status: 404, message: "Verify the credentials", };
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
            return { status: 400, message: error.message };
        }
    }
    /**
     * handle the incoming login requests
     */
    login = async (req: Request, res: Response):Promise<any> => {
        console.log(this.test)
        let credentials: UserCredentials|null = req.body;
        if(!Object.keys(credentials as object).length) 
            return res.status(404).json({message: "Credentials are invalid"});
        try {
            let _res = await this.verifyUserCredentials(credentials);
            console.log("verify credentials -------->", _res)
            if(_res.status === 200) {
                let token:string = await generateJWTToken({username: 'siemah'}, "secret")
                _res.user['token'] = token;
            }
            return res.status(_res.status).json(_res);
        } catch (error) {
            return res.status(400).json("retry to generate a token ->" + error);
        }
    }

}

export default new UserController;