import express, { Application } from 'express';
import { connect2db } from './config/db';
import setupMiddlewares from './config/middlewares';
import { routesHandler } from './config/routes';
import dotenv from 'dotenv';

let app: Application = express();
// import a envirment var using dotenv package
dotenv.config();

connect2db()
    .then(msg => {
        console.log(msg);
        // middlewares config
        setupMiddlewares(app);
        // here handle incoming requests
        routesHandler(app);
    })
    .catch(err => {
        console.log(err)
    });

app.listen(3004, () => console.log('runing on port 3004'))