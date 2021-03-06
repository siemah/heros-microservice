import mongoose from "mongoose";

/**
 * connextion to DB
 * @author siemah
 * @version 1.0.0
 * @see mongoose docs
 * @return Promise<string|any>
 */
const connect2db = (): Promise<string|any> => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      "mongodb+srv://root:root@booksapp-yag4y.mongodb.net/books?retryWrites=true&w=majority", //"mongodb://localhost:27017/customersdb",//"mongodb://localhost:27017/bookdb",
      { useNewUrlParser: true },
      (err: any) => {
        if (err) reject( new Error(err));
        resolve("DB connexion established succussfully:)");
      }
    )
  })
}

export { connect2db };