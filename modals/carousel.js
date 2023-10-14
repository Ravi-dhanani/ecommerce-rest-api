const mongoose = require("mongoose");
const CarouselSchema = new mongoose.Schema({
  Image: {
    type: String,
    require: true,
  },
  Title: {
    type: String,
    require: true,
  },
  Date: {
    type: String,
    require: true,
  },
});

const carousel = mongoose.model("carousel", CarouselSchema);

module.exports = carousel;
