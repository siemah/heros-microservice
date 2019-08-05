import { Request, Response, NextFunction } from "express";
import axios from 'axios';
import { verifyToken } from "../utils/tools";

/**
 * check if the user has role permission
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @param role string the role to check
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
      return res.status(400).json({ message: error.message });
    }
}

/**
 * check if the user has admin roles
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @see express router
 */
export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  hasRightRoles(req, res, next, 'admin');
}

/**
 * check if the user has customer roles
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @see express router
 */
export async function isCustomer(req: Request, res: Response, next: NextFunction) {
  hasRightRoles(req, res, next, 'customer');  
}
