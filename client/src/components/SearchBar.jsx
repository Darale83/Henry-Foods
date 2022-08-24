import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecipeByName } from "../redux/actions";
import styles from "../styles/SearchBar.module.css";
import search from "../assets/search.png";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getRecipeByName(name));
    setName("");
    setCurrentPage(1);
  };
  return (
    <div className={styles.searchWrapper}>
      <input
        className={styles.input}
        type="search"
        placeholder="Search..."
        value={name}
        onChange={(e) => handleChange(e)}
      />
      <button
        className={styles.searchButton}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        <img src={search} alt="" />
      </button>
    </div>
  );
}
