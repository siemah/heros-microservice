import express, { Application, Response, Request, NextFunction } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv'
import OrderController from './controllers/OrderController';
import { isAdmin, isCustomer } from './config/middleware';

// express middlewares configuration 
let app: Application = express();
// establish a connexion to mongoDB
mongoose.connect(
  "mongodb+srv://root:root@booksapp-yag4y.mongodb.net/orders?retryWrites=true&w=majority", //"mongodb://localhost:27017/customersdb",
  { useNewUrlParser: true },
  (err: any) => {
    if (err) throw new Error(err);
    console.log("DB connexion established succussfully:)");
  }
);
// setup a middlewares
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(helmet());
app.use(morgan("dev"));
app.use((req: Request, res: Response, next: NextFunction,) => {
  res.set('Access-Control-Origin-Methods', 'GET, OPTIONS, POST');
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.set('Access-Control-Origin-Type', '*');
  res.set('Access-Control-Allow-Headers', '*');
  next();
})
// handle a routes
app.get('/orders', isAdmin, OrderController.getAllOrders);
app.get('/orders/me', isCustomer, OrderController.getUserOrders);
app.post('/order/', isCustomer, OrderController.addOrder);
app.get('/order/:orderId', OrderController.getOrder);// we must check if is a user who add the order
app.delete('/order/:orderId', isAdmin, OrderController.removeOrder);
// connect to db and then launch the server
app.use((err: any, req: Request, res: Response, next: NextFunction): any => {
  console.log("__________________");
  console.error(err.stack)
  console.log("__________________");
  res.status(500).send('Something broke!')
});
// listen to incomming request
app.listen(3003, () => {
  console.log("Book service running on port 3003");
});