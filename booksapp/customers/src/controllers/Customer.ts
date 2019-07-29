import { Request, Response } from "express";
import Customer, { CustomerDocument } from "../models/Customer";

class CustomersController {
  
  /**
   * retrieve all customers details
   * @param req Request
   * @param res Response
   */
  async getAllCustomers(req: Request, res: Response) {
    let customers: CustomerDocument[];
    try {
      customers = await Customer.find({}); 
    } catch (error) {
      throw new Error(error.message);
    }
    return res.status(200).json({
      length: customers.length,
      customers
    });
  }

}

export default new CustomersController;