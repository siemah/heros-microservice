import { Application, json, urlencoded, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import helmet from "helmet";
import axios from 'axios';
import { verifyToken } from "../utils/tools";
import dotenv from 'dotenv'


/**
 * config a middlewares of book service needs
 * @author siemah
 * @version 1.0.0
 * @since 28/07/2019
 */

/**
 * config some middlewares
 * @param app Application
 */
export default function setupMiddlewares(app: Application): void {
  dotenv.config();
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.use(helmet());
};

/**
 * check if the user has admin roles
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @see express router
 */
async function  hasRightRoles(req: Request, res: Response, next: NextFunction, role:string) {
  try {
    let decode = await verifyToken(req.headers);
    if(decode.status !== 202) 
      res.status(401).json({ message: "Unauthorized section", decode })
    else {
      let { data, status } = await axios.post("http://localhost:3004/auth/verifyroles", {
        roles: role,
        email: decode.results.email,
      });
      if(status === 200) 
        next();
      else 
        res.status(401).json({ message: "Unauthorized section" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Unauthorized section" });
  }
}
export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  hasRightRoles(req, res, next, 'admin');
}


/**
 * check if the user has admin roles
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @see express router
 */
export async function isCustomer(req: Request, res: Response, next: NextFunction) {
  hasRightRoles(req, res, next, 'customer');  
}
