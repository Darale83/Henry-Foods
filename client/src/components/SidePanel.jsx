/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import styles from "../styles/SidePanel.module.css";
import Home from "./Home";
import {
  getAllRecipes,
  getAllTypes,
  clearRecipes,
  filterByType,
  orderByAlphabet,
  orderByHealthScore,
} from "../redux/actions";

export default function SidePanel() {
  const dispatch = useDispatch();
  const [types, setTypes] = useState([]);
  const recipes = useSelector((state) => state.allRecipes);
  const allTypes = useSelector((state) => state.types);
  const [order, setOrder] = useState("");

  // useEffect(() => {
  //   dispatch(getAllRecipes());
  //   dispatch(getAllTypes());
  // }, [dispatch]);

  const handleFilterByType = (e) => {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
  };

  const handleOrderByAlphabet = (e) => {
    e.preventDefault();
    if (e.target.value === "All") {
      dispatch(getAllRecipes());
    } else {
      dispatch(orderByAlphabet(e.target.value));
      // setCurrentPage(1);
      setOrder(`Ordered ${e.target.value}`);
    }
  };

  const handleOrderByHealthScore = (e) => {
    e.preventDefault();
    if (e.target.value === "All") {
      dispatch(getAllRecipes());
    } else {
      dispatch(orderByHealthScore(e.target.value));
      // setCurrentPage(1);
      setOrder(`Ordered ${e.target.value}`);
    }
  };

  return (
    <div className={styles.sidePanel}>
      <div>
        <SearchBar />
      </div>
      <div className="containerSearch">
        <div className="allSelects">
          <select className="selects" onChange={(e) => handleFilterByType(e)}>
            <option value="All">Filter by type</option>
            {allTypes?.map((recipeType, index) => {
              return (
                <option key={index} value={recipeType?.name}>
                  {recipeType?.name}
                </option>
              );
            })}
          </select>

          <select
            className="selects"
            onChange={(e) => handleOrderByAlphabet(e)}
          >
            <option value="All">Order by alphabet</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>

          <select
            className="selects"
            onChange={(e) => handleOrderByHealthScore(e)}
          >
            <option value="All">Order by Health Score</option>
            <option value="high score">Higher Score</option>
            <option value="low score">Lower Score</option>
          </select>
        </div>
      </div>
    </div>
  );
}
