const express = require("express");
const router = express.Router();
require("../db/conn");
const product = require("../modals/product");
const cloudinary = require("../db/cloudinary");

router.post("/api/addProduct", async (req, res) => {
  const {
    title,
    description,
    category,
    subCategory,
    price,
    size,
    color,
    slug,
    images,
  } = req.body;

  const multiimages = req.body.images;
  const tempArray = [];
  for (const img of multiimages) {
    const result = await cloudinary.uploader.upload(img.baseURL);
    tempArray.push({
      public_Id: result.public_id,
      url: result.url,
    });
  }
  var datetime = new Date();
  const date = datetime.toISOString().slice(0, 10);

  if (
    !title ||
    !description ||
    !category ||
    !price ||
    !size ||
    !color ||
    !slug ||
    !images ||
    !subCategory
  ) {
    return res.json({ error: "please Data Enter Properly", status: false });
  }

  try {
    const AddProduct = new product({
      title,
      description,
      category,
      price,
      size,
      color,
      slug,
      images: tempArray,
      subCategory,
      Date: date,
    });

    await AddProduct.save();

    res.send({
      message: "Product Add Successfully",
      success: true,
      status: 200,
    });
  } catch (err) {
    res.json({ message: "Invalid Carousel", status: false });
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

router.get("/api/getProduct/:slug", async (req, res) => {
  try {
    const getProduct = await product.findById({
      _id: req.params.slug,
    });
    res.status(200).send({ data: getProduct, status: 200 });
  } catch (ex) {
    res.json({ message: "Product  invalid", status: false });

    console.log(ex);
  }
});

router.put("/api/updateProduct/:id", async (req, res) => {
  const data = {
    category: req.body.category,
    subCategory: req.body.subCategory,
    title: req.body.title,
    slug: req.body.slug,
    description: req.body.description,
    size: req.body.size,
    color: req.body.color,
    images: req.body.images,
    price: req.body.category,
  };

  try {
    const updateProduct = await product.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
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
