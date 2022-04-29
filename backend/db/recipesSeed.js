const Recipes = require("../model/recipes-model");
const recipesSeed = require("./recipesSeed.json");

// Remove any preexisting data
Recipes.deleteMany({})
  .then(() => {
    return Recipes.insertMany(recipesSeed);
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    process.exit();
  });
