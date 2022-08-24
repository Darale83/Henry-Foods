import React from "react";
import noFood from "../assets/noFood.gif";
import styles from "../styles/NoFood.module.css";

export default function NoFood() {
  return (
    <div className={styles.noFoodContainer}>
      <div className={styles.loader}>
        <h1>No recipe with that name!</h1>
        <img className={styles.loadingImage} src={noFood} alt="No Food" />
      </div>
    </div>
  );
}
