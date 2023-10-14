const mongoose = require("mongoose");
const VariantSchema = new mongoose.Schema({
  VariantName: {
    type: String,
    require: true,
  },
  VariantStorage: {
    type: String,
    require: true,
  },
  Date: {
    type: String,
    require: true,
  },
});

const variant = mongoose.model("Variant", VariantSchema);

module.exports = variant;
