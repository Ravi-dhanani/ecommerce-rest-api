require("dotenv").config();
require("mongoose");
require("mongodb");
require("./db/conn.js");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const Authenticate = require("./middleware/authenthicate.js");
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors({}));
app.use(require("./router/auth.js"));
// app.use(require("./middleware/authenthicate.js"));
app.use(require("./router/admin.js"));
app.use(require("./router/carousel.js"));
app.use(require("./router/category.js"));
app.use(require("./router/subCategory.js"));
app.use(require("./router/color.js"));
app.use(require("./router/size.js"));
app.use(require("./router/product.js"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    parameterLimit: 10000000,
    limit: "5000mb",
  })
);
app.get("*", (req, res, next) => {
  res.status(200).json({
    message: "bad request",
  });
});
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT} `);
});
