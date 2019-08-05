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

  /**
   * retrieve all customers details
   * @param req Request
   * @param res Response
   */
  async getCustomer(req: Request, res: Response) {
    let customer: CustomerDocument|null;
    try {
      customer = await Customer.findOne({ _id: req.params.id });
    } catch (error) {
      throw new Error(error.message);
    }
    return res.status(200).json(customer);
  }

  /**
   * create a new customer document   
   * @param req request
   * @param res response
   * @return Promise<any> express route
   */
  async addNewCustomer(req: Request, res: Response): Promise<any> {
    let customer: CustomerDocument;
    let { fullname, email } = req.body
        ? req.body 
        : { fullname:null, email:null }; 
    if( !fullname || !email ) 
      return res.status(400).json({ message: "Invalid operation" });
    try {
      /**
       * 1/ verify the user authorization received from request
       * 2/ must check if one is exist using email as index and unique value
       * 3/ send request to auth and book services to verify the validity if customer and book by id's
       * 4/ create a new customer if everything work as expected or render an error response
       */
      let newCustomer: CustomerDocument = new Customer({
        fullname: fullname,
        email: email,
      });
      customer = await newCustomer.save();
      console.log(customer);
      res.status(201).json(customer)
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeCustomer (req: Request, res: Response) {
    let customer: any;
    console.log("params", req.params.id);
    try {
      customer = await Customer.findByIdAndRemove(req.params.id);
    } catch (error) {
      throw new Error(error);
    }
    res.status(203).json({
      message: "customer has been deleted",
      customer,
    })
  }

}

export default new CustomersController;