const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  CategoryImage: {
    type: String,
    require: true,
  },
  CategoryTitle: {
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
