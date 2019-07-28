import { Application, json, urlencoded } from "express";
import morgan = require("morgan");
import helmet = require("helmet");

/**
 * config a middlewares of book service needs
 * @author siemah
 * @version 1.0.0
 * @since 28/07/2019
 */
export default function setupMiddlewares(app: Application): void {
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.use(helmet());
};