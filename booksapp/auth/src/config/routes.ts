import { Application } from "express";
import UserController from "../controllers/UserController";
/**
 * handle all auth routes
 * @author siemah
 * @version 1.0.0   
 * @param app Application
 */
export function routesHandler(app: Application) {
    app.get('/auth/accounts', UserController.getAllUserAccount);
    app.post('/auth/login', UserController.login);
    app.post('/auth/create', UserController.createUserAccount);
}