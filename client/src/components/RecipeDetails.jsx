import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails, removeDetail } from "../redux/actions/index";
import { useEffect } from "react";
import styles from "../styles/RecipeDetails.module.css";
import Loader from "./Loader";

export default function RecipeDetails(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.details);
  console.log(recipe);
  useEffect(() => {
    dispatch(removeDetail());
    dispatch(getRecipeDetails(id));
  }, [dispatch, id]);

  return (
    <div className={styles.box}>
      {recipe.length === 0 ? (
        <div className={styles.detailsLoader}>
          <Loader />
        </div>
      ) : (
        <div className={styles.detailsWrapper}>
          <div className={styles.detailsCard}>
            <div className={styles.detailsTitle}>
              <h1>{recipe.title}</h1>
            </div>
            <div className={styles.detailsInfo}>
              <img
                className={styles.detailsImage}
                src={recipe.image}
                alt="Not Found"
              />
            </div>
            <div>
              <p>
                <strong>Health Score: </strong>
                {recipe.healthScore}
              </p>
              <p>
                <strong>Dish Types: </strong>
                {id.length > 6
                  ? recipe.dishTypes
                  : recipe.dishTypes?.join(", ")}
              </p>
              <p>
                <strong>Diets: </strong>
                {id.length > 6
                  ? recipe.types?.map((e) => e.name).join(", ")
                  : recipe.diets?.join(", ")}
              </p>
              <p>
                <strong>Description: </strong>
                {recipe.summary}
              </p>
              <p>
                <strong>Steps: </strong>
                {recipe.steps}
              </p>
            </div>
          </div>

          <Link to="/home">
            <button className={styles.detailsButton}>Back</button>
          </Link>
        </div>
      )}
    </div>
  );
}
