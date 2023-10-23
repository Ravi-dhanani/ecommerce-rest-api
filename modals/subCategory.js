const mongoose = require("mongoose");
const SubCategorySchema = new mongoose.Schema({
  SubCategoryImage: {
    type: String,
    require: true,
  },
  Public_id: {
    type: String,
    require: false,
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
