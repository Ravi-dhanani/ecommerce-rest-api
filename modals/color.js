const mongoose = require("mongoose");
const ColorSchema = new mongoose.Schema({
  ColorName: {
    type: String,
    require: true,
  },
  ColorCode: {
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
