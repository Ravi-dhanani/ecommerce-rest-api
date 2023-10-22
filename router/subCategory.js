const express = require("express");
const router = express.Router();
require("../db/conn");
const Subcategory = require("../modals/subCategory");

router.post("/api/addSubCategory", async (req, res) => {
  const { SubCategoryImage, SubCategoryTitle, CategoryId } = req.body;
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
      const subCategoryData = new Subcategory({
        SubCategoryTitle,
        SubCategoryImage,
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
  try {
    const updateSubCategory = await Subcategory.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    res.send({
      data: updateSubCategory,
      message: "Update Successfully",
      status: true,
    });
  } catch (ex) {
    res.json({ message: "SubCategory not Update ", status: false });
  }
});

router.get("/api/deleteSubCategory/:id", async (req, res) => {
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
});

module.exports = router;
