import { Request, Response } from "express";
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

}

export default new OrdersController