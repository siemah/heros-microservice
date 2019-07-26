import express, { Request, Response, NextFunction, Application } from "express";
import helmet from 'helmet';
import morgan from 'morgan';

import movieApi from '../api/movies';

import { ServerOptions as Options } from '../types/config'

const start = (options: Options) => new Promise((resolve: any, reject: any) => {

  if (!options.repo) 
    reject(new Error('The server must be started with a connected repository'));
  if (!options.port) 
    reject(new Error('The server must have a port to start'));

  const app: Application = express();
  app.use(morgan("dev"));
  app.use(helmet());
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    reject(new Error('Something went wrong!, err:' + err))
    res.status(500).send('Something went wrong!')
  })

  // we add our API's to the express app
  movieApi(app, options)

  // finally we start the server, and return the newly created server 
  const server = app.listen(options.port, () => resolve(server))
}); 

export default Object.assign({}, { start });