const express = require("express");
const router = express.Router();
require("../db/conn");
const variant = require("../modals/variant");

router.post("/api/addVariant", async (req, res) => {
  const { VariantName, VariantStorage } = req.body;
  var dateOfVariant = new Date();
  const date = dateOfVariant.toISOString().slice(0, 10);
  if (!VariantName) {
    return res.json({ error: "please Data Enter Properly", status: false });
  }

  try {
    const AddVariant = new variant({
      VariantName,
      VariantStorage,
      Date: date,
    });

    await AddVariant.save();

    res.json({ message: "Variant Add Successfully", status: 200 });
  } catch (err) {
    res.json({ message: "Invalid Variant", status: false });
    console.log(err);
  }
});

router.get("/api/getVariant", async (req, res) => {
  try {
    const listVariant = await variant.find();
    res.send({ data: listVariant, message: "Variant list", status: 200 });
  } catch (ex) {
    res.json({ message: "Variant list invalid", status: false });
    console.log(ex);
  }
});

router.get("/api/getVariant/:id", async (req, res) => {
  try {
    const getVariant = await variant.findById({
      _id: req.params.id,
    });
    res.status(200).send({ data: getVariant, status: 200 });
  } catch (ex) {
    res.json({ message: "Variant  invalid", status: false });

    console.log(ex);
  }
});

router.put("/api/updateVariant/:id", async (req, res) => {
  try {
    const updateVariant = await variant.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    res.send({
      data: updateVariant,
      message: "Variant Update Successfully",
      status: true,
    });
  } catch (ex) {
    res.json({ message: "Variant not Update ", status: false });
  }
});

router.get("/api/deleteVariant/:id", async (req, res) => {
  await variant.findByIdAndRemove(req.params.id).then((data) => {
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Variant not found with id " + req.params.id,
      });
    }
    res.send({
      status: true,
      success: true,
      message: "Variant successfully deleted!",
    });
  });
});

module.exports = router;
