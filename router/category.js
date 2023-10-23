const express = require("express");
const router = express.Router();
require("../db/conn");
const category = require("../modals/category");
const cloudinary = require("../db/cloudinary");

router.post("/api/addCategory", async (req, res) => {
  const { CategoryImage, CategoryTitle } = req.body;
  const file = req.body.CategoryImage;
  const result = await cloudinary.uploader.upload(file, {
    upload_preset: "ecommerce-images",
  });
  var datetime = new Date();
  const date = datetime.toISOString().slice(0, 10);
  if (!CategoryImage || !CategoryTitle) {
    return res.json({ error: "please Data Enter Properly", status: false });
  }

  try {
    const CategoryExits = await category.findOne({
      CategoryTitle: CategoryTitle,
    });
    if (CategoryExits) {
      return res.json({ error: "Category  AlreadyExits" });
    } else {
      if (result.public_id && result.url) {
        const categoryData = new category({
          CategoryImage: result.url,
          CategoryTitle: req.body.CategoryTitle,
          Public_id: result.public_id,
          Date: date,
        });

        await categoryData.save();

        res.send({
          message: "Category Add Successfully",
          success: true,
          status: 200,
        });
      }
    }
  } catch (err) {
    res.json({ message: "Invalid Category", status: false });
    console.log(err);
  }
});

router.get("/api/getCategory", async (req, res) => {
  try {
    const listCategory = await category.find();
    res.send({ data: listCategory, message: "Category list", status: 200 });
  } catch (ex) {
    res.json({ message: "Category list invalid", status: false });
    console.log(ex);
  }
});

router.get("/api/getCategory/:id", async (req, res) => {
  try {
    const lstCategory = await category.findById({
      id: req.params.id,
    });
    res.send({ data: lstCategory, message: "Category", status: 200 });
  } catch (ex) {
    res.json({ message: "Category invalid", status: false });
    console.log(ex);
  }
});

router.put("/api/updateCategory/:id", async (req, res) => {
  const file = req.body.CategoryImage;
  const updatecategory = await category.findById(req.params.id);

  if (req.body.CategoryImage !== "") {
    const public_id = updatecategory.Public_id;

    if (updatecategory.CategoryImage == req.body.CategoryImage) {
      const data = {
        CategoryTitle: req.body.CategoryTitle,
        CategoryImage: req.body.CategoryImage,
      };
      const updateCategoryData = await category.findByIdAndUpdate(
        req.params.id,
        data,
        { new: true }
      );
      res.send({
        data: updateCategoryData,
        message: "Update Successfully",
        status: true,
      });
    } else {
      if (public_id) {
        await cloudinary.uploader.destroy(public_id);
      }
      const newImage = await cloudinary.uploader.upload(file, {
        upload_preset: "ecommerce-images",
      });
      const data = {
        CategoryTitle: req.body.CategoryTitle,
        CategoryImage: newImage.url,
        Public_id: newImage.public_id,
      };
      const updateCategoryData = await category.findByIdAndUpdate(
        req.params.id,
        data,
        { new: true }
      );
      res.send({
        data: updateCategoryData,
        message: "Update Successfully",
        status: true,
      });
    }
  }
});

router.get("/api/deleteCategory/:id", async (req, res) => {
  const deleteId = await category.findById(req.params.id);
  const public_id = deleteId.Public_id;
  if (public_id) {
    await cloudinary.api.delete_resources_by_prefix(public_id);
    await category.findByIdAndRemove(req.params.id).then((data) => {
      if (!data) {
        return res.status(404).send({
          success: false,
          message: "Category not found with id " + req.params.id,
        });
      }
      res.send({
        status: true,
        success: true,
        message: "Category deleted successfully !",
      });
    });
  }
});

module.exports = router;
