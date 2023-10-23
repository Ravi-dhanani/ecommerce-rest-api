const mongoose = require("mongoose");
const CarouselSchema = new mongoose.Schema({
  ImageUrl: {
    type: String,
    require: true,
  },
  Public_id: {
    type: String,
    require: false,
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
