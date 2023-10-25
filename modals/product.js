const mongoose = require("mongoose");
const ProductsSchema = new mongoose.Schema({
  category: {
    type: String,
    require: true,
  },
  subCategory: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },

  size: [
    {
      _id: {
        type: String,
        require: true,
      },
      size: {
        type: String,
        require: true,
      },
      Date: {
        type: String,
        require: true,
      },
    },
  ],

  color: [
    {
      _id: {
        type: String,
        require: true,
      },
      colorName: {
        type: String,
        require: true,
      },
      colorCode: {
        type: String,
        require: true,
      },
      Date: {
        type: String,
        require: true,
      },
    },
  ],

  images: [String],

  price: {
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
