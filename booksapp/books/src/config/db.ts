import mongoose from "mongoose";

// connextion to DB
const connect2db = (): Promise<string|any> => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      "mongodb://localhost:27017/bookdb",
      { useNewUrlParser: true },
      (err: any) => {
        if (err) reject( new Error(err));
        resolve("DB connexion established succussfully:)");
      }
    )
  })
}

export { connect2db };