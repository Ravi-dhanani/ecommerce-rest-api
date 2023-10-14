const express = require("express");
const router = express.Router();
require("../db/conn");
const category = require("../modals/category");

router.post("/api/addCategory", async (req, res) => {
  const { CategoryImage, CategoryTitle } = req.body;
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
      const categoryData = new category({
        CategoryImage,
        CategoryTitle,
        Date: date,
      });

      await categoryData.save();

      res.json({ message: "Category Add Successfully", status: 200 });
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

router.put("/api/updateCategory/:id", async (req, res) => {
  try {
    const updateCategory = await category.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    res.send({
      data: updateCategory,
      message: "Update Successfully",
      status: true,
    });
  } catch (ex) {
    res.json({ message: "Category not Update ", status: false });
  }
});

router.get("/api/deleteCategory/:id", async (req, res) => {
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
});

module.exports = router;
