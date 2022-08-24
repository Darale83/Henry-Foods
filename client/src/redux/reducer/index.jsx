import {
  CLEAR_RECIPES,
  FILTER_BY_TYPE,
  GET_ALL_RECIPES,
  GET_ALL_TYPES,
  GET_RECIPE_BY_NAME,
  GET_RECIPE_DETAILS,
  REMOVE_DETAIL,
  ORDER_BY_ALPHABET,
  ORDER_BY_HEALTH_SCORE,
  CREATE_RECIPE,
  FILTER_BY_HEALTH,
} from "../actions/index";

const initialState = {
  allRecipes: JSON.parse(window.localStorage.getItem("allRecipes")) || [],
  allRecipesCopy: JSON.parse(window.localStorage.getItem("allRecipes")) || [],
  types: JSON.parse(window.localStorage.getItem("types")) || [],
  details: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        allRecipes: action.payload,
        allRecipesCopy: action.payload,
      };

    case GET_ALL_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case GET_RECIPE_DETAILS:
      return {
        ...state,
        details: action.payload[0],
      };

    case REMOVE_DETAIL:
      return {
        ...state,
        details: [],
      };

    case CLEAR_RECIPES:
      return {
        ...state,
        allRecipes: [],
      };

    case CREATE_RECIPE:
      return {
        ...state,
        allRecipes: action.payload,
        allRecipesCopy: action.payload,
      };

    case GET_RECIPE_BY_NAME:
      return {
        ...state,
        allRecipes: action.payload,
      };

    case FILTER_BY_TYPE:
      return {
        ...state,
        allRecipes:
          action.payload === "All"
            ? state.allRecipesCopy
            : state.allRecipes?.filter((recipe) =>
                recipe.diets?.includes(action.payload)
              ),
      };

    case FILTER_BY_HEALTH:
      return {
        ...state,
        allRecipes: state.allRecipes?.filter(
          (recipe) => recipe.healthScore < 65
        ),
      };

    case ORDER_BY_ALPHABET:
      let orderRecipes =
        action.payload === "asc"
          ? state.allRecipes?.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
              }
              if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.allRecipes?.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return -1;
              }
              if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allRecipes:
          action.payload === "All" ? state.allRecipesCopy : orderRecipes,
      };

    case ORDER_BY_HEALTH_SCORE:
      let orderByScore =
        action.payload === "low score"
          ? state.allRecipes?.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (a.healthScore < b.healthScore) {
                return -1;
              }
              return 0;
            })
          : state.allRecipes?.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (a.healthScore < b.healthScore) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allRecipes:
          action.payload === "All" ? state.allRecipesCopy : orderByScore,
      };

    default:
      return state;
  }
}

export default reducer;
