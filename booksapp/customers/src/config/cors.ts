import { Request, Response, NextFunction } from "express";

/**
 * @author siemah
 * @version 1.0.0
 * @see expressjs doc
 * config a cors middleware to prevent reach those 
 * routes unless the origin request come from a whitelist
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export const corsConfig = (req: Request, res: Response, next: NextFunction): any => {
  let whiteList = ["https://aalladine.com", "http://127.0.0.1", "http://127.0.0.1:3002", "http://127.0.0.1:3001"];
  let urlFrom: any = req.get('origin');
  if ( whiteList.includes(urlFrom) )
    res.header("Access-Control-Allow-Origin", urlFrom);
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
}