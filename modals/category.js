const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
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
});

const category = mongoose.model("category", CategorySchema);

module.exports = category;
