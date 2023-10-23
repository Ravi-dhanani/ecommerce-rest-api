const express = require("express");
const router = express.Router();
require("../db/conn");
const Subcategory = require("../modals/subCategory");
const cloudinary = require("../db/cloudinary");

router.post("/api/addSubCategory", async (req, res) => {
  const { SubCategoryImage, SubCategoryTitle, CategoryId } = req.body;
  const file = req.body.SubCategoryImage;
  const result = await cloudinary.uploader.upload(file, {
    upload_preset: "ecommerce-images",
  });

  var datetime = new Date();
  const date = datetime.toISOString().slice(0, 10);
  if (!SubCategoryImage || !SubCategoryTitle) {
    return res.json({ error: "please Data Enter Properly", status: false });
  }

  try {
    const SubCategoryExits = await Subcategory.findOne({
      SubCategoryTitle: SubCategoryTitle,
      SubCategoryImage: SubCategoryImage,
    });
    if (SubCategoryExits) {
      return res.json({ error: "SubCategory  AlreadyExits" });
    } else {
      if (result.public_id && result.url) {
        const subCategoryData = new Subcategory({
          SubCategoryTitle,
          SubCategoryImage: result.url,
          Public_id: result.public_id,
          CategoryId,
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
  const file = req.body.SubCategoryImage;
  const updateSubCategory = await Subcategory.findById(req.params.id);
  if (req.body.SubCategoryImage !== "") {
    const public_id = updateSubCategory.Public_id;

    if (updateSubCategory.SubCategoryImage == req.body.SubCategoryImage) {
      const data = {
        SubCategoryTitle: req.body.SubCategoryTitle,
        SubCategoryImage: req.body.SubCategoryImage,
        CategoryId: req.body.CategoryId,
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
        SubCategoryTitle: req.body.SubCategoryTitle,
        SubCategoryImage: newImage.url,
        Public_id: newImage.public_id,
        CategoryId: req.body.CategoryId,
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
  const public_id = deleteId.Public_id;
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
