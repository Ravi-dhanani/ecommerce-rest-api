const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../db/conn");
const Users = require("../modals/usersSchema");

router.get("/", (req, res) => {
  res.send("Hello World from the server auth.js");
});

router.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "please Data Enter Properly" });
  }
  try {
    const userExits = await Users.findOne({ email: email });
    if (userExits) {
      return res.status(422).json({ error: "EmailId  AlreadyExits" });
    } else {
      const user = new Users({
        name,
        email,
        password,
      });

      const userRegister = await user.save();
      console.log("Final Submit Done", userRegister);

      res.status(201).json({ message: "User Register Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please Filled the data" });
    }
    const userLogin = await Users.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Credientials" });
      } else {
        return res.status(200).json({
          message: "user login Successfully",
          token: token,
          status: 200,
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
