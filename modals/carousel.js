const mongoose = require("mongoose");
const CarouselSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    require: true,
  },
  public_Id: {
    type: String,
    require: false,
  },
  title: {
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
