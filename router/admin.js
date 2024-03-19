const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../db/conn");
const Admin = require("../modals/admin");

router.post("/admin/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "please field Enter Properly" });
  }
  try {
    const adminExits = await Admin.findOne({ email: email });
    if (adminExits) {
      return res.status(422).json({ error: "EmailId  AlreadyExits" });
    } else {
      const admin = new Admin({
        name,
        email,
        password,
      });

      await admin.save();

      res.json({ message: "admin Register Successfully", status: false });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/admin/getAdmin/:id", async (req, res) => {
  try {
    const listAdmin = await Admin.findById({
      _id: req.params.id,
    });
    res.status(200).send({ data: listAdmin, status: 200 });
  } catch (ex) {
    res.json({ message: "Admin list invalid", status: false });
    console.log(ex);
  }
});

router.put("/admin/updateAdmin/:id", async (req, res) => {
  try {
    const updateAdmin = await Admin.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    res.send({
      data: updateAdmin,
      message: "Update Successfully",
      status: true,
    });
  } catch (ex) {
    res.json({ message: "Admin not Update", status: false });
  }
});

router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please Filled the data" });
    }
    const adminLogin = await Admin.findOne({ email: email });
    if (adminLogin) {
      const isMatch = await bcrypt.compare(password, adminLogin.password);
      const token = await adminLogin.generateToken();
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Credientials" });
      } else {
        return res.json({
          message: "Admin login Successfully",
          token: token,
          status: false,
          data: adminLogin,
        });
      }
    } else {
      return res.status(400).json({ error: "Invalid Credientials" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
