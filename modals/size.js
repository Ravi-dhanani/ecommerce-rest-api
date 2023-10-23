const mongoose = require("mongoose");
const SizeSchema = new mongoose.Schema({
  Size: {
    type: String,
    require: true,
  },
  Date: {
    type: String,
    require: true,
  },
});

const size = mongoose.model("size", SizeSchema);

module.exports = size;
