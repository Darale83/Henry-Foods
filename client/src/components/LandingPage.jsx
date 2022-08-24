import React from "react";
import { Link } from "react-router-dom";
import LandingFood from "../assets/LandingFood.webp";
import styles from "../styles/LandingPage.module.css";

export default function LandingPage() {
  return (
    <div>
      <div className={styles.background}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Welcome to Henry Foods</h1>
          <h2 className={styles.subTitle}>Let's see what's cookin'</h2>
          <Link to="/home">
            <button className={styles.landingBtn} type="submit">
              Dive In!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
