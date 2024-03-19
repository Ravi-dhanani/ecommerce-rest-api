const mongoose = require("mongoose");
const ProductsSchema = new mongoose.Schema({
  category: [
    {
      categoryImage: {
        type: String,
        require: true,
      },
      public_id: {
        type: String,
        require: false,
      },
      categoryTitle: {
        type: String,
        require: true,
      },
      Date: {
        type: String,
        require: true,
      },
    },
  ],
  subCategory: [
    {
      subCategoryImage: {
        type: String,
        require: true,
      },
      public_id: {
        type: String,
        require: false,
      },
      subCategoryTitle: {
        type: String,
        require: true,
      },
      categoryId: {
        type: String,
        require: true,
      },
      Date: {
        type: String,
        require: true,
      },
    },
  ],
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
      sizeName: {
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

  images: [
    {
      public_Id: {
        type: String,
        require: false,
      },
      url: {
        type: String,
        require: true,
      },
    },
  ],

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
