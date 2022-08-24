import React from "react";
import loadingImage from "../assets/Loading2.gif";
import styles from "../styles/Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <img className={styles.loadingImage} src={loadingImage} alt="loader" />
      </div>
    </div>
  );
}
