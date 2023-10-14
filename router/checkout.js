const express = require("express");
const router = express.Router();
require("../db/conn");
const checkout = require("../modals/checkout");

router.post("/api/addCheckOut", async (req, res) => {
  const {
    FirstName,
    LastName,
    Email,
    Phone,
    HouseNo,
    AreaName,
    City,
    State,
    Country,
    CartItems,
    TotalAmount,
  } = req.body;
  var datetime = new Date();
  const date = datetime.toISOString().slice(0, 10);
  if (
    !FirstName ||
    !LastName ||
    !Email ||
    !Phone ||
    !HouseNo ||
    !City ||
    !State ||
    !Country ||
    !CartItems ||
    !TotalAmount
  ) {
    return res.json({ error: "please Data Enter Properly", status: false });
  }

  try {
    const AddProduct = new product({
      FirstName,
      LastName,
      Email,
      Phone,
      HouseNo,
      AreaName,
      City,
      State,
      Country,
      CartItems,
      TotalAmount,
      Date: date,
    });

    await AddProduct.save();

    res.json({ message: "Product Add Successfully", status: 200 });
  } catch (err) {
    res.json({ message: "Invalid Product", status: false });
    console.log(err);
  }
});

router.get("/api/getProduct", async (req, res) => {
  try {
    const listProduct = await product.find();
    res.send({ data: listProduct, message: "Product list", status: 200 });
  } catch (ex) {
    res.json({ message: "Product list invalid", status: false });
    console.log(ex);
  }
});

router.get("/api/getProduct/:id", async (req, res) => {
  try {
    const getProduct = await product.findById({
      _id: req.params.id,
    });
    res.status(200).send({ data: getProduct, status: 200 });
  } catch (ex) {
    res.json({ message: "Product  invalid", status: false });

    console.log(ex);
  }
});

router.put("/api/updateProduct/:id", async (req, res) => {
  try {
    const updateProduct = await product.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    res.send({
      data: updateProduct,
      message: "Product Update Successfully",
      status: true,
    });
  } catch (ex) {
    res.json({ message: "Product not Update ", status: false });
  }
});

router.get("/api/deleteProduct/:id", async (req, res) => {
  await product.findByIdAndRemove(req.params.id).then((data) => {
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Product not found with id " + req.params.id,
      });
    }
    res.send({
      status: true,
      success: true,
      message: "Product successfully deleted!",
    });
  });
});

module.exports = router;
