import express, { Application, Response, Request, NextFunction } from 'express';
import { connect2db } from './config/db';
import setupMiddlewares from './config/middleware';
import setupRoutes from './config/routes';

// express middlewares configuration 
let app: Application = express();

// connect to db and then launch the server
connect2db()
  .then((msg: string) => {
    console.log(msg);

    setupMiddlewares(app);
    setupRoutes(app);
    
  })
  .catch(err => {
    console.log("error on DB connextion ", err);
  })
  .finally(() => {
    app.use((err: any, req: Request, res: Response, next: NextFunction): any => {
      console.log("__________________");
      console.error(err.stack)
      console.log("__________________");
      res.status(500).send('Something broke!')
    })
    app.listen(3001, () => {
      console.log("Book service running on port 3001");
    });
  })