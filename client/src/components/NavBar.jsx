import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import henryLogo from "../assets/henryLogo.png";

export default function NavBar() {
  return (
    <div className={styles.nav}>
      <div className={styles.links}>
        <NavLink
          to="/home"
          className={styles.title}
          activeClassName={styles.activeTitle}
        >
          HOME
        </NavLink>
        <NavLink
          to="/create"
          className={styles.title}
          activeClassName={styles.activeTitle}
        >
          CREATE
        </NavLink>
      </div>
      <div className={styles.topLeft}>
        <a
          href="https://www.soyhenry.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img
            src={henryLogo}
            alt=""
            style={{ maxHeight: "60%", maxWidth: "60%" }}
          />
        </a>
      </div>
    </div>
  );
}
