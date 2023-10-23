const express = require("express");
const router = express.Router();
require("../db/conn");
const carousel = require("../modals/carousel.js");
const cloudinary = require("../db/cloudinary");

router.post("/api/addCarousel", async (req, res) => {
  const { ImageUrl, Title } = req.body;
  const file = req.body.ImageUrl;
  const result = await cloudinary.uploader.upload(file, {
    upload_preset: "ecommerce-images",
  });
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
      if (result.public_id && result.url) {
        const carousalData = new carousel({
          ImageUrl: result.url,
          Public_id: result.public_id,
          Title,
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
  const file = req.body.ImageUrl;
  const updatecarousel = await carousel.findById(req.params.id);
  if (req.body.ImageUrl !== "") {
    const public_id = updatecarousel.Public_id;

    if (updatecarousel.ImageUrl == req.body.ImageUrl) {
      const data = {
        Title: req.body.Title,
        ImageUrl: req.body.ImageUrl,
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
        Title: req.body.Title,
        ImageUrl: newImage.url,
        Public_id: newImage.public_id,
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
  const public_id = deleteId.Public_id;
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
