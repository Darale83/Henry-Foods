const axios = require("axios");
//const { DataTypes } = require("sequelize/types");
const { Recipe, Type } = require("../db");
const { API_KEY, API_KEY2, API_KEY3, API_KEY4, API_KEY5 } = process.env;

const getApiInfo = async () => {
  const apiInfo = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`
  );
  const apiRecipes = apiInfo.data?.results.map((e) => {
    return {
      id: e.id,
      title: e.title,
      image: e.image,
      summary: e.summary.replace(/(<([^>]+)>)/gi, ""),
      healthScore: e.healthScore,
      // diets: e.diets,
      dishTypes: e.dishTypes.join("").toString(),
      steps: e.analyzedInstructions[0]?.steps
        .map((e) => {
          return e.step;
        })
        .join("")
        .toString(),
    };
  });
  await Recipe.bulkCreate(apiRecipes);
  //return apiRecipes;
  //console.log(apiRecipes);
};

const apiToDb = async (info) => {
  return await Recipe.bulkCreate(info);
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      trough: {
        attributes: [],
      },
    },
  });
};

const getAllRecipes = async () => {
  const [apiRecipes2, dbRecipes2] = await Promise.all([
    getApiInfo(),
    getDbInfo(),
  ]);
  return [...apiRecipes2, ...dbRecipes2];
};

const createTypes = async () => {
  const apiInfo = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`
  );
  const diets = await apiInfo.data.results.map((e) => {
    return e.diets;
  });
  const result = diets.flat();
  const result2 = new Set(result);
  const result3 = [...result2];
  const result4 = result3.map((e) => {
    return { name: e };
  });
  await Type.bulkCreate(result4);
};

module.exports = {
  getAllRecipes,
  createTypes,
  getApiInfo,
  apiToDb,
};
