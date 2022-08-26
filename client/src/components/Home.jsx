/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRecipes,
  getAllTypes,
  filterByType,
  orderByAlphabet,
  orderByHealthScore,
  filterByHealth,
} from "../redux/actions";
import RecipeCard from "./RecipeCard";
import Loader from "./Loader";
import styles from "../styles/Home.module.css";
import Paginate from "./Paginate";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import noFood from "../assets/noFood.gif";
import NoFood from "./NoFood";

const Home = () => {
  const allRecipes = useSelector((state) => state.allRecipes);
  console.log(allRecipes);
  const types = useSelector((state) => state.types);
  console.log(types);
  const [order, setOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

  const currentRecipes = !allRecipes.length
    ? []
    : allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  console.log(currentRecipes[0]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getAllTypes());
  }, [dispatch]);

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
      setCurrentPage(1);
      setOrder(`Ordered ${e.target.value}`);
    }
  };

  const handleOrderByHealthScore = (e) => {
    e.preventDefault();
    if (e.target.value === "All") {
      dispatch(getAllRecipes());
    } else {
      dispatch(orderByHealthScore(e.target.value));
      setCurrentPage(1);
      setOrder(`Ordered ${e.target.value}`);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getAllRecipes());
  };

  return (
    <div className={styles.homeContainer}>
      <div>
        <NavBar />
      </div>
      <div className={styles.home}>
        <aside className={styles.aside}>
          <div className={styles.sidePanel}>
            <div className={styles.searchPos}>
              <SearchBar setCurrentPage={setCurrentPage} />
            </div>
            <div className={styles.containerSearch}>
              <div className={styles.allSelects}>
                <select
                  className={styles.selects}
                  onChange={(e) => handleFilterByType(e)}
                >
                  <option value="All">Filter by type</option>
                  {types?.map((recipeType, index) => {
                    return (
                      <option key={index} value={recipeType?.name}>
                        {recipeType?.name}
                      </option>
                    );
                  })}
                </select>

                <select
                  className={styles.selects}
                  onChange={(e) => handleOrderByAlphabet(e)}
                >
                  <option value="All">Order by alphabet</option>
                  <option value="asc">A-Z</option>
                  <option value="desc">Z-A</option>
                </select>

                <select
                  className={styles.selects}
                  onChange={(e) => handleOrderByHealthScore(e)}
                >
                  <option value="All">Order by Health Score</option>
                  <option value="high score">Higher Score</option>
                  <option value="low score">Lower Score</option>
                </select>
              </div>
            </div>
            <button
              className={styles.reloadBtn}
              onClick={(e) => handleClick(e)}
            >
              Load All Recipes
            </button>
          </div>
        </aside>

        {currentRecipes[0] === "No recipe with that name" ? (
          <div className={styles.noFoodWrapper}>
            <NoFood />
          </div>
        ) : currentRecipes[0] ? (
          <div className={styles.cardsContainer}>
            <h1>All Recipes</h1>
            <div className={styles.grid}>
              {currentRecipes &&
                currentRecipes?.map((e) => {
                  return (
                    <RecipeCard
                      key={e.id}
                      id={e.id}
                      title={e.title}
                      image={e.image}
                      healthScore={e.healthScore}
                      dishTypes={e.dishTypes}
                      diets={e.diets}
                    />
                  );
                })}
            </div>
          </div>
        ) : (
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        )}
        <div className={styles.paginationDiv}>
          <li>
            <button onClick={handlePrevBtn} className={styles.prevBtn}>
              Prev
            </button>
          </li>
          {allRecipes.length > 9 && (
            <Paginate
              currentPage={currentPage}
              recipesPerPage={recipesPerPage}
              allRecipes={allRecipes?.length}
              paginate={paginate}
            />
          )}
          <li>
            <button onClick={handleNextBtn} className={styles.nextBtn}>
              Next
            </button>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Home;
