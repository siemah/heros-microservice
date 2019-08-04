import { Application, json, urlencoded } from "express";
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
/**
 * this some middlewares for express app
 * @author siemah
 * @version 1.0.0
 */

/**
 * setup all middlewares
 * @param app Application express instance
 */
export default function setupMiddlewares (app: Application) {
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(morgan("dev"))
    app.use(compression());
    app.use(helmet());
}