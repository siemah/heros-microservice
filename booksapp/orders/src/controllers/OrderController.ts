import { Request, Response } from "express";
import axios from "axios";
import OrderModel, { OrderDocument, OrderParams } from "../models/OrderModel";

/**
 * handle all request about orders
 * @name OrdersController
 * @author siemah
 * @version 1.0.0
 */
class OrdersController {

    /**
     * retrieve all orders 
     * @param req Request
     * @param res Response
     * @return Promise<any> 
     */
    async getAllOrders(req: Request, res: Response): Promise<any> {
        let orders: Array<OrderDocument>;

        try {
            orders = await OrderModel.find({});
            res.status(200).json({
                length: orders.length,
                orders,
            })
        } catch (error) {
            throw new Error(error);
        }
    }


    /**
     * create a new order
     * @param req Request
     * @param res Response
     * @return Promise<any> 
     */
    async addOrder(req: Request, res: Response): Promise<any> {
        let orderParams: OrderParams = req.body;
        let newOrder: OrderDocument = new OrderModel(orderParams);
        console.log(orderParams)
        // here dont forget to verify if all params required are in body object some validation
        try {
            await newOrder.save();
            res.status(200).json({
                message: "New order added succusfully"
            })
        } catch (error) {
            throw new Error(error);
        }
    }

    async getOrder(req: Request, res: Response): Promise<any> {
        let { orderId } = req.params;
        let order;
        // some validarion if there is any
        try {
            order = await OrderModel.findById(orderId);
            console.log(order)
            if(order) {
                let {data: book } = await axios.get(`http://localhost:3001/book/${order.book}`);
                let {data: customer} = await axios.get(`http://localhost:3002/customer/${order.customer}`);
                
                res.status(200).json({
                    message: 'Order found with success',
                    order: {
                        dueDate: order.dueDate,
                        returnAt: order.returnAt,
                        customer,
                        book,
                    }
                })
            } else res.status(404).json({
                message: "Order not found"
            })
        } catch (error) {
            // here we lust handle the error and send an appropriate response or create error handler
            throw new Error(error)
        }
    }

}

export default new OrdersController