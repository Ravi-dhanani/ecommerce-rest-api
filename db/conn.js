const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    dbName: "ecommerce",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("Could not connect", err);
  });
const express = require("express");
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
