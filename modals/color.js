const mongoose = require("mongoose");
const ColorSchema = new mongoose.Schema({
  colorName: {
    type: String,
    require: true,
  },
  colorCode: {
    type: String,
    require: false,
  },
  Date: {
    type: String,
    require: true,
  },
});

const color = mongoose.model("color", ColorSchema);

module.exports = color;
