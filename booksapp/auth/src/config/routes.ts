import { Application } from "express";
import UserController from "../controllers/UserController";
/**
 * handle all auth routes
 * @author siemah
 * @version 1.0.0   
 * @param app Application
 */
export function routesHandler(app: Application) {
    app.post('/auth/create', UserController.createUserAccount);
}