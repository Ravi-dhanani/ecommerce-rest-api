const express = require("express");
const router = express.Router();
require("../db/conn");
const carousel = require("../modals/carousel.js");
const cloudinary = require("../db/cloudinary");
const Authenticate = require("../middleware/authenthicate");

router.post("/api/addCarousel", async (req, res) => {
  const { imageUrl, title } = req.body;
  const file = req.body.imageUrl;
  const result = await cloudinary.uploader.upload(file, {
    upload_preset: "ecommerce-images",
  });
  var datetime = new Date();
  const date = datetime.toISOString().slice(0, 10);
  if (!imageUrl || !title) {
    return res.json({ error: "please Data Enter Properly", status: false });
  }

  try {
    const carouselExits = await carousel.findOne({ title: title });
    if (carouselExits) {
      return res.json({ message: "Carousal  AlreadyExits", status: false });
    } else {
      if (result.public_id && result.url) {
        const carousalData = new carousel({
          imageUrl: result.url,
          public_Id: result.public_id,
          title,
          Date: date,
        });

        await carousalData.save();
      }
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
  const file = req.body.imageUrl;
  const updatecarousel = await carousel.findById(req.params.id);
  if (req.body.imageUrl !== "") {
    const public_id = updatecarousel.public_Id;

    if (updatecarousel.imageUrl == req.body.imageUrl) {
      const data = {
        title: req.body.title,
        imageUrl: req.body.imageUrl,
      };
      const updateCarouselData = await carousel.findByIdAndUpdate(
        req.params.id,
        data,
        { new: true }
      );
      res.send({
        data: updateCarouselData,
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
        title: req.body.title,
        imageUrl: newImage.url,
        public_id: newImage.public_id,
      };
      const updateCarouselData = await carousel.findByIdAndUpdate(
        req.params.id,
        data,
        { new: true }
      );
      res.send({
        data: updateCarouselData,
        message: "Update Successfully",
        status: true,
      });
    }
  }
});

router.get("/api/deleteCarousel/:id", async (req, res) => {
  const deleteId = await carousel.findById(req.params.id);
  const public_id = deleteId.public_Id;
  if (public_id) {
    await cloudinary.uploader.destroy(public_id);
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
  }
});

module.exports = router;
