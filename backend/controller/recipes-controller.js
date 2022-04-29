const express = require("express");
const router = express.Router();

const Recipes = require("../model/recipes-model");

router.get("/", (req, res) => {
  Recipes.find({})
    .then((recipes) => {
      res.json(recipes);
    })
    .catch((err) => res.json(err));
});

router.post("/", (req, res) => {
  Recipes.create(req.body)
    .then((data) => {
      Recipes.find({}).then((recipes) => {
        res.json(recipes);
      });
    })
    .catch((err) => res.json(err));
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  Recipes.findByIdAndUpdate(
    { _id: id },

    req.body
  )

    .then((data) => {
      Recipes.find({}).then((recipes) => {
        res.json(recipes);
      });
    })
    .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Recipes.findByIdAndDelete(id)
    .then((data) => {
      Recipes.find({}).then((recipes) => {
        res.json(recipes);
      });
    })
    .catch((err) => res.json(err));
});
module.exports = router;
