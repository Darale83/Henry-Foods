import React from "react";
import { Link } from "react-router-dom";
//import styles from "../styles/RecipeCard.module.css";
import "./RecipeCard.css";

export default function RecipeCard({
  id,
  title,
  image,
  healthScore,
  dishTypes,
  diets,
}) {
  return (
    <div className="card">
      <Link to={`/recipes/detail/${id}`}>
        <div className="face front">
          <div>
            <h3>{title}</h3>
            <img src={image} width="200px" height="250px" alt="Not found" />
          </div>
        </div>
        <div className="face back">
          <div className="inner">
            <img src={image} alt="Not found" />
            <div className="stats">
              <h2>{title}</h2>
              <h4>Health Score: {healthScore}</h4>
              <h4>
                Dish Types: {id.length > 6 ? dishTypes : dishTypes.join(", ")}
              </h4>
              <h4>Diets: {diets.join(", ")}</h4>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
