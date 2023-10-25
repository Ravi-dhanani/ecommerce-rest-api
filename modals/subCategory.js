const mongoose = require("mongoose");
const SubCategorySchema = new mongoose.Schema({
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
});

const Subcategory = mongoose.model("subCategory", SubCategorySchema);

module.exports = Subcategory;
