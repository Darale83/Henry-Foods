import React from "react";
import styles from "../styles/Paginate.module.css";

export default function Paginate({
  recipesPerPage,
  allRecipes,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <nav>
      <ul className={styles.ulPos}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className={styles.pagination} key={number}>
              <button
                className={
                  currentPage === number ? styles.active : styles.paginationBtn
                }
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
