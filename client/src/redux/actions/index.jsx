import axios from "axios";
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const GET_RECIPE_DETAILS = "GET_RECIPE_DETAILS";
export const REMOVE_DETAIL = "REMOVE_DETAIL";
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME";
export const CLEAR_RECIPES = "CLEAR_RECIPES";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const ORDER_BY_ALPHABET = "ORDER_BY_ALPHABET";
export const ORDER_BY_HEALTH_SCORE = "ORDER_BY_HEALTH_SCORE";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const FILTER_BY_HEALTH = "FILTER_BY_HEALTH";

export const getAllRecipes = () => {
  return async function (dispatch) {
    return await axios
      .get(`http://localhost:3001/recipes`)
      .then((response) => {
        if (response.data.name === "Error") {
          console.log(response);
          // return alert(response.data.name);
        } else {
          window.localStorage.setItem(
            "allRecipes",
            JSON.stringify(response.data)
          );
        dispatch({
          type: GET_ALL_RECIPES,
          payload: response.data,
        });
      }
    })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getAllTypes = () => {
  return async function (dispatch) {
    return await axios
      .get(`http://localhost:3001/types`)
      .then((response) => {
        if (response.data.name === "Error") {
          console.log(response);
          // return alert(response.data.name);
        } else {
          window.localStorage.setItem("types", JSON.stringify(response.data));
          dispatch({
            type: GET_ALL_TYPES,
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getRecipeDetails = (id) => {
  return async function (dispatch) {
    return await axios
      .get(`http://localhost:3001/recipes/${id}`)
      .then((response) => {
        dispatch({
          type: GET_RECIPE_DETAILS,
          payload: response.data,
        });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const createRecipe = (payload) => {
  return async function (dispatch) {
    return await axios
      .post(`http://localhost:3001/recipes`, payload)
      .then((response) => {
        dispatch({
          type: CREATE_RECIPE,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const clearRecipes = () => {
  return {
    type: CLEAR_RECIPES,
  };
};

export const removeDetail = () => {
  return {
    type: REMOVE_DETAIL,
  };
};

export const getRecipeByName = (name) => {
  return async function (dispatch) {
    return await axios
      .get(`http://localhost:3001/recipes?name=${name}`)
      .then((response) => {
        dispatch({
          type: GET_RECIPE_BY_NAME,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const filterByType = (payload) => {
  return {
    type: FILTER_BY_TYPE,
    payload,
  };
};

export const orderByAlphabet = (payload) => {
  return {
    type: ORDER_BY_ALPHABET,
    payload,
  };
};

export const orderByHealthScore = (payload) => {
  return {
    type: ORDER_BY_HEALTH_SCORE,
    payload,
  };
};

export const filterByHealth = (payload) => {
  return {
    type: FILTER_BY_HEALTH,
    payload,
  };
};
