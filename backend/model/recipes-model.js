const mongoose = require("../connection/connection");

const recipesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const Recipes = mongoose.model("Recipes", recipesSchema);

module.exports = Recipes;
