import { Application } from "express";
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

export default function setupMiddlewares (app: Application) {
    app.use(morgan("dev"))
    app.use(compression());
    app.use(helmet());
}