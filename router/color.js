const express = require("express");
const router = express.Router();
require("../db/conn");
const color = require("../modals/color");

router.post("/api/addColor", async (req, res) => {
  const { colorName, colorCode } = req.body;

  var datetime = new Date();
  const date = datetime.toISOString().slice(0, 10);

  if (!colorName) {
    return res.json({ error: "please Data Enter Properly", status: false });
  }

  try {
    const colorData = new color({
      colorName,
      colorCode,
      Date: date,
    });

    await colorData.save();

    res.send({
      message: "Color Add Successfully",
      success: true,
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/api/getColor/:id", async (req, res) => {
  try {
    const listColor = await color.findById({
      _id: req.params.id,
    });
    res.status(200).send({ data: listColor, status: 200 });
  } catch (ex) {
    res.json({ message: "Color list invalid", status: false });
    console.log(ex);
  }
});
router.get("/api/getColors", async (req, res) => {
  try {
    const listColor = await color.find();
    res.send({ data: listColor, message: "Color list", status: 200 });
  } catch (ex) {
    res.json({ message: "Color list invalid", status: false });
    console.log(ex);
  }
});

router.put("/api/updateColor/:id", async (req, res) => {
  try {
    const updateColor = await color.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    res.send({
      data: updateColor,
      message: "Update Successfully",
      status: true,
    });
  } catch (ex) {
    res.json({ message: "Color not Update", status: false });
  }
});

router.get("/api/deleteColor/:id", async (req, res) => {
  await color.findByIdAndRemove(req.params.id).then((data) => {
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Color not found with id " + req.params.id,
      });
    }
    res.send({
      status: true,
      success: true,
      message: "Color deleted successfully !",
    });
  });
});

module.exports = router;
