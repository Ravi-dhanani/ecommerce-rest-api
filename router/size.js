const express = require("express");
const router = express.Router();
require("../db/conn");
const size = require("../modals/size");

router.post("/api/addSize", async (req, res) => {
  const { sizeName } = req.body;

  var datetime = new Date();
  const date = datetime.toISOString().slice(0, 10);

  if (!sizeName) {
    return res.status(422).json({ error: "please field Enter Properly" });
  }
  try {
    const sizeExits = await size.findOne({ sizeName: sizeName });
    if (sizeExits) {
      return res.status(422).json({ error: "Size   AlreadyExits" });
    } else {
      const sizeData = new size({
        sizeName,
        Date: date,
      });

      await sizeData.save();

      res.send({
        message: "Size Add Successfully",
        success: true,
        status: 200,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/api/getSize/:id", async (req, res) => {
  try {
    const listSize = await size.findById({
      _id: req.params.id,
    });
    res.status(200).send({ data: listSize, status: 200 });
  } catch (ex) {
    res.json({ message: "Size list invalid", status: false });
    console.log(ex);
  }
});

router.get("/api/getSize", async (req, res) => {
  try {
    const lstSize = await size.find();
    res.send({ data: lstSize, message: "Size list", status: 200 });
  } catch (ex) {
    res.json({ message: "Size list invalid", status: false });
    console.log(ex);
  }
});

router.put("/api/updateSize/:id", async (req, res) => {
  try {
    const updateSize = await size.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    res.send({
      data: updateSize,
      message: "Update Successfully",
      status: true,
    });
  } catch (ex) {
    res.json({ message: "Size not Update", status: false });
  }
});
router.get("/api/ /:id", async (req, res) => {
  await size.findByIdAndRemove(req.params.id).then((data) => {
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Size not found with id " + req.params.id,
      });
    }
    res.send({
      status: true,
      success: true,
      message: "Size deleted successfully !",
    });
  });
});

module.exports = router;
