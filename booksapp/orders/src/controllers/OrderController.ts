import axios from "axios";
import { Request, Response } from "express";
import OrderModel, { OrderDocument, OrderParams } from "../models/OrderModel";
import { verifyToken } from "../utils/tools";

/**
 * handle all request about orders
 * @name OrdersController
 * @author siemah
 * @version 1.0.0
 */
class OrdersController {

    async getOrders(id?: string|null): Promise<any[]>  {
        return new Promise(async (resolve, reject) => {
            let orders: Array<OrderDocument>;
            let _condiction = id ? { customer: id } : {}
            try {
                orders = await OrderModel.find(_condiction);
                if (orders) 
                    resolve(orders);
                else 
                    reject({message: 'Something went wrong try again'})
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * retrieve all orders 
     * @param req Request
     * @param res Response
     * @return Promise<any> 
     */
    async getAllOrders(req: Request, res: Response): Promise<any> {
        let orders: Array<OrderDocument>;
        try {
            orders = await this.getOrders();
            res.status(200).json({
                length: orders.length,
                orders,
            })
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * retrieve all orders 
     * @param req Request
     * @param res Response
     * @return Promise<any> 
     */
    getUserOrders = async (req: Request, res: Response): Promise<any> => {
        let orders: Array<OrderDocument>;
        try {
            let _jwt = await verifyToken(req.headers);
            orders = await this.getOrders(_jwt.results.id);
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
        // here dont forget to verify if all params required are in body object some validation
        try {
            let _jwt = await verifyToken(req.headers);
            let orderParams: OrderParams = {...req.body, customer: _jwt.results.id};
            let newOrder: OrderDocument = new OrderModel(orderParams);
            let order = await newOrder.save();
            res.status(200).json({
                message: "New order added succusfully",
                order,
            })
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * get the current order details include customer and book data
     * @param req Request
     * @param res Response 
     */
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

    /**
     * remove the current order details include customer and book data
     * @param req Request
     * @param res Response 
     */
    async removeOrder(req: Request, res: Response): Promise<any> {
        let { orderId } = req.params;
        let order: OrderDocument|null;
        // some validarion if there is any
        try {
            order = await OrderModel.findOneAndDelete({_id: orderId});
            console.log(order)
            res.status(202).json({
                message: order? 'Order has been deleted' : 'Something went wrong try again later',
            });
        } catch (error) {
            // here we lust handle the error and send an appropriate response or create error handler
            throw new Error(error)
        }
    }

}

export default new OrdersController