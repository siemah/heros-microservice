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
   */
  async addNewCustomer(req: Request, res: Response) {
    let customer: CustomerDocument;
    console.log(req.body);
    try {
      let newCustomer: CustomerDocument = new Customer({
        fullname: req.body.fullname,
        email: req.body.email,
      });
      customer = await newCustomer.save();
      console.log(customer);
      
    } catch (error) {
      throw new Error(error);
    }
    res.status(203).json(customer)
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