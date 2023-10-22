const mongoose = require("mongoose");
const category = require("./category");
const SubCategorySchema = new mongoose.Schema({
  SubCategoryImage: {
    type: String,
    require: true,
  },
  SubCategoryTitle: {
    type: String,
    require: true,
  },
  CategoryId: {
    type: String,
    require: true,
  },
  Date: {
    type: String,
    require: true,
  },
});

const Subcategory = mongoose.model("subCategory", SubCategorySchema);

module.exports = Subcategory;
