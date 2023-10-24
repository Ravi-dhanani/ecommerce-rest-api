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
  Slug: {
    type: String,
    require: true,
  },
  Description: {
    type: String,
    require: true,
  },

  Size: [
    {
      _id: {
        type: String,
        require: true,
      },
      Size: {
        type: String,
        require: true,
      },
      Date: {
        type: String,
        require: true,
      },
    },
  ],

  Color: [
    {
      _id: {
        type: String,
        require: true,
      },
      ColorName: {
        type: String,
        require: true,
      },
      ColorCode: {
        type: String,
        require: true,
      },
      Date: {
        type: String,
        require: true,
      },
    },
  ],

  Images: [String],

  Price: {
    type: Number,
    require: false,
  },

  Date: {
    type: String,
    require: false,
  },
});

const product = mongoose.model("Products", ProductsSchema);

module.exports = product;
