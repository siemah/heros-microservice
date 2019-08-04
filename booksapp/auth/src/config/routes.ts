import { Application } from "express";
import UserController from "../controllers/UserController";
import { verifyToken } from "../utils/tools";
/**
 * handle all auth routes
 * @author siemah
 * @version 1.0.0   
 * @param app Application
 */
export function routesHandler(app: Application) {
    app.get('/auth/accounts', UserController.getAllUserAccount);
    app.post('/auth/verifytoken', async (req: any, res: any) => {
        try {
            let _res = await verifyToken(req.headers);
            res.status(_res.status).json(_res.results);      
        } catch (error) {
            console.log(error)
            res.status(error.status).json(error);
        }
    });
    app.post('/auth/verifyRoles', UserController.getUserRoles);
    app.post('/auth/login', UserController.login);// login or regenerate a new token
    app.post('/auth/create', UserController.createUserAccount);// create an new user account 'customer'
}