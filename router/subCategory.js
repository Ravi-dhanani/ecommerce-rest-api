const express = require("express");
const router = express.Router();
require("../db/conn");
const Subcategory = require("../modals/subCategory");
const cloudinary = require("../db/cloudinary");

router.post("/api/addSubCategory", async (req, res) => {
  const { subCategoryImage, subCategoryTitle, categoryId } = req.body;
  const file = req.body.subCategoryImage;
  const result = await cloudinary.uploader.upload(file, {
    upload_preset: "ecommerce-images",
  });

  var datetime = new Date();
  const date = datetime.toISOString().slice(0, 10);
  if (!subCategoryImage || !subCategoryTitle) {
    return res.json({ error: "please Data Enter Properly", status: false });
  }

  try {
    const SubCategoryExits = await Subcategory.findOne({
      subCategoryTitle: subCategoryTitle,
      subCategoryImage: subCategoryImage,
    });
    if (SubCategoryExits) {
      return res.json({ error: "SubCategory  AlreadyExits" });
    } else {
      if (result.public_id && result.url) {
        const subCategoryData = new Subcategory({
          subCategoryTitle,
          subCategoryImage: result.url,
          public_id: result.public_id,
          categoryId,
          Date: date,
        });

        await subCategoryData.save();

        res.send({
          message: "SubCategory Add Successfully",
          success: true,
          status: 200,
        });
      }
    }
  } catch (err) {
    res.json({ message: "Invalid SubCategory", status: false });
    console.log(err);
  }
});

router.get("/api/getSubCategory", async (req, res) => {
  try {
    const listSubCategory = await Subcategory.find();
    res.send({
      data: listSubCategory,
      message: "SubCategory list",
      status: 200,
    });
  } catch (ex) {
    res.json({ message: "SubCategory list invalid", status: false });
    console.log(ex);
  }
});

router.put("/api/updateSubCategory/:id", async (req, res) => {
  const file = req.body.subCategoryImage;
  const updateSubCategory = await Subcategory.findById(req.params.id);
  if (req.body.subCategoryImage !== "") {
    const public_id = updateSubCategory.public_id;

    if (updateSubCategory.subCategoryImage == req.body.subCategoryImage) {
      const data = {
        subCategoryTitle: req.body.subCategoryTitle,
        subCategoryImage: req.body.subCategoryImage,
        categoryId: req.body.categoryId,
      };
      const updateSubCategoryData = await Subcategory.findByIdAndUpdate(
        req.params.id,
        data,
        { new: true }
      );
      res.send({
        data: updateSubCategoryData,
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
        subCategoryTitle: req.body.subCategoryTitle,
        subCategoryImage: newImage.url,
        public_id: newImage.public_id,
        categoryId: req.body.categoryId,
      };
      const updateSubCategoryData = await Subcategory.findByIdAndUpdate(
        req.params.id,
        data,
        { new: true }
      );
      res.send({
        data: updateSubCategoryData,
        message: "Update Successfully",
        status: true,
      });
    }
  }
});

router.get("/api/deleteSubCategory/:id", async (req, res) => {
  const deleteId = await Subcategory.findById(req.params.id);
  const public_id = deleteId.public_id;
  if (public_id) {
    await cloudinary.api.delete_resources_by_prefix(public_id);
    await Subcategory.findByIdAndRemove(req.params.id).then((data) => {
      if (!data) {
        return res.status(404).send({
          success: false,
          message: "SubCategory not found with id " + req.params.id,
        });
      }
      res.send({
        status: true,
        success: true,
        message: "SubCategory deleted successfully !",
      });
    });
  }
});

module.exports = router;
