const dotenv = require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const cors = require("cors");
const recipesController = require("./controller/recipes-controller");
const path = require("path");
const app = express();
const port = process.env.PORT || 3005;
var distDir = __dirname + "/dist/";
app.use(express.static(path.join(__dirname, "../frontend/index.html")));
app.use(express.static(distDir));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/recipes", recipesController);

app.listen(process.env.PORT || port, () => {
  console.log(`Express MVC app is running on port ${port}`);
});
