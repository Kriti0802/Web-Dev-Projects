import mongoose from "mongoose";
const MongoURI =
  "mongodb+srv://kritisingh:yCvlfLxf6WTx3h0v@cluster0.tbfxvuo.mongodb.net/careercrave?retryWrites=true&w=majority";

mongoose
  .connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
 