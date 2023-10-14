const mongoose = require("mongoose");
const ProductsSchema = new mongoose.Schema({
  Category: {
    type: String,
    require: true,
  },
  Title: {
    type: String,
    require: true,
  },
  Description: {
    type: String,
    require: true,
  },
  Ram: {
    type: String,
    require: true,
  },

  Variant: {
    type: String,
    require: true,
  },

  Arrivals: {
    type: String,
    require: true,
  },

  MainImage: {
    type: String,
    require: false,
  },
  Price: {
    type: Number,
    require: false,
  },
  Color: {
    type: String,
    require: false,
  },
  Date: {
    type: String,
    require: false,
  },
});

const product = mongoose.model("Products", ProductsSchema);

module.exports = product;
