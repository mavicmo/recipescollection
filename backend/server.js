const dotenv = require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const cors = require("cors");
const recipesController = require("./controller/recipes-controller");
const path = require("path");
const app = express();
const port = process.env.PORT || 3005;
app.use(express.static(__dirname + "/frontend"));
// app.use(express.static(distDir));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/recipes", recipesController);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

app.listen(process.env.PORT || port, () => {
  console.log(`Express MVC app is running on port ${port}`);
});
