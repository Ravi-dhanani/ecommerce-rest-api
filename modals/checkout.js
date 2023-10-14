const mongoose = require("mongoose");
const CheckoutSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    require: true,
  },
  LastName: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  Phone: {
    type: Number,
    require: true,
  },
  HouseNo: {
    type: Number,
    require: true,
  },
  AreaName: {
    type: String,
    require: true,
  },
  City: {
    type: String,
    require: true,
  },
  State: {
    type: String,
    require: true,
  },
  Country: {
    type: String,
    require: true,
  },
  CartItems: [
    {
      _id: {
        type: String,
        require: true,
      },
      Title: {
        type: String,
        require: true,
      },
      MainImage: {
        type: String,
        require: true,
      },
      Price: {
        type: String,
        require: true,
      },
      Color: {
        type: String,
        require: true,
      },
      Quantity: {
        type: Number,
        require: true,
      },
    },
  ],
  TotalAmount: {
    type: Number,
    require: true,
  },
  Status: {
    type: Boolean,
    require: true,
  },
  Date: {
    type: String,
    require: true,
  },
});

const checkout = mongoose.model("CheckOut", CheckoutSchema);

module.exports = checkout;
