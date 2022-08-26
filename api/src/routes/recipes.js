const { Router } = require("express");
//const { DataTypes } = require("sequelize/types");
const { Recipe, Type } = require("../db");
const { getAllRecipes, getDbInfo } = require("../utils/functions");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    const allRecipes = await getDbInfo();
    if (name) {
      let recipes = allRecipes.filter((e) =>
        e.title.toLowerCase().includes(name.toString().toLowerCase())
      );
      recipes.length
        ? res.json(recipes)
        : res.json(["No recipe with that name"]);
    } else {
      res.json(allRecipes);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const allRecipes = await getDbInfo();
    if (id) {
      let recipe = allRecipes.filter((e) => e.id == id);
      recipe
        ? res.status(200).json(recipe)
        : res.status(400).send("No recipe with that id");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, summary, healthScore, steps, diets, dishTypes, image } =
      req.body;

    const createdRecipe = await Recipe.create({
      title,
      summary,
      healthScore,
      steps,
      diets,
      dishTypes,
      image,
    });
    for (let i = 0; i < diets.length; i++) {
      const diet = await Type.findOne({
        where: { name: diets[i] },
      });
      createdRecipe.addType(diet);
    }
    res.status(200).send("Recipe successfully created!");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
