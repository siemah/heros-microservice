import express, { Application, Response, Request, NextFunction } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import Customer from './controllers/Customer';
import { corsConfig } from './config/cors';

// express middlewares configuration 
let app: Application = express();
// establish a connexion to mongoDB
mongoose.connect(
  "mongodb+srv://root:root@booksapp-yag4y.mongodb.net/customers?retryWrites=true&w=majority", //"mongodb://localhost:27017/customersdb",
  { useNewUrlParser: true },
  (err: any) => {
    if (err) throw new Error(err);
    console.log("DB connexion established succussfully:)");
  }
);
// setup a middlewares
app.use(corsConfig);// cors configuration route
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(helmet());
app.use(morgan("dev"));
// handle a routes
app.get('/customers', Customer.getAllCustomers);
app.post('/customer', Customer.addNewCustomer);
app.delete('/customer/:id', Customer.removeCustomer)
app.get('/customer/:id', Customer.getCustomer)

// connect to db and then launch the server
app.use((err: any, req: Request, res: Response, next: NextFunction): any => {
  console.log("__________________");
  console.error(err.stack)
  console.log("__________________");
  res.status(500).send('Something broke!')
});
// listen to incomming request
app.listen(3002, () => {
  console.log("Customer service running on port 3002");
});