const express = require("express");
const router = express.Router();
require("../db/conn");
const carousel = require("../modals/carousel.js");

router.post("/api/addCarousel", async (req, res) => {
  const { ImageUrl, Title } = req.body;
  var datetime = new Date();
  const date = datetime.toISOString().slice(0, 10);
  if (!ImageUrl || !Title) {
    return res.json({ error: "please Data Enter Properly", status: false });
  }

  try {
    const carouselExits = await carousel.findOne({ Title: Title });
    if (carouselExits) {
      return res.json({ message: "Carousal  AlreadyExits", status: false });
    } else {
      const carousalData = new carousel({
        ImageUrl,
        Title,
        Date: date,
      });

      await carousalData.save();
      res.send({
        message: "Carousel Add Successfully",
        success: true,
        status: 200,
      });
    }
  } catch (err) {
    res.json({ message: "Invalid Carousel", status: false });
    console.log(err);
  }
});

router.get("/api/getCarousel", async (req, res) => {
  try {
    const listCarousel = await carousel.find();
    res.send({ data: listCarousel, message: "Carousel list", status: 200 });
  } catch (ex) {
    res.json({ message: "Carousel list invalid", status: false });
    console.log(ex);
  }
});

router.put("/api/updateCarousel/:id", async (req, res) => {
  try {
    const updateCarousel = await carousel.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    res.send({
      data: updateCarousel,
      message: "Update Successfully",
      status: true,
    });
  } catch (ex) {
    res.json({ message: "Doctor not Update ", status: false });
  }
});

router.get("/api/deleteCarousel/:id", async (req, res) => {
  await carousel.findByIdAndRemove(req.params.id).then((data) => {
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Carousel not found with id " + req.params.id,
      });
    }
    res.send({
      status: true,
      success: true,
      message: "Carousel deleted successfully !",
    });
  });
});

module.exports = router;
