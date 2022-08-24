/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { createRecipe, getAllTypes } from "../redux/actions";
import styles from "../styles/CreateRecipe.module.css";
import NavBar from "./NavBar";

function validate(input) {
  let errors = {};

  if (!input.title) {
    errors.title = "Recipe must have a title!";
  } else if (!input.summary) {
    errors.summary = "Recipe must have a summary!";
  } else if (input.healthScore > 100 || input.healthScore < 0) {
    errors.healthScore = "Health Score must be lower than 100";
  } else if (!input.steps) {
    errors.steps = "Recipe must have some steps";
  } else if (!input.diets.length) {
    errors.diets = "Recipe must have at least 1 diet";
  } else if (!input.dishTypes.length) {
    errors.dishTypes = "Recipe must have some Dish Type";
  }
  return errors;
}

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    title: "",
    summary: "",
    image: "",
    healthScore: 0,
    steps: "",
    dishTypes: [],
    diets: [],
  });

  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  const handleSubmit = (e) => {
    let x = parseInt(input.healthScore);

    if (!input.title || !input.summary) {
      e.preventDefault();
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    } else if (!input.diets.length) {
      e.preventDefault();
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    } else if (!input.dishTypes) {
      e.preventDefault();
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    } else if (!input.steps) {
      e.preventDefault();
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    } else if (/^\d+$/.test(x) !== true) {
      e.preventDefault();
      setErrors({ numberError: "Health Score must be a number" });
    } else {
      e.preventDefault();
      dispatch(createRecipe(input));
      alert("Recipe successfully created!");

      setInput({
        title: "",
        summary: "",
        image: "",
        healthScore: 0,
        steps: "",
        dishTypes: [],
        diets: [],
      });
      window.location.href = "/home";
    }
  };

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectDiets(e) {
    setInput({
      ...input,
      diets: [...input.diets, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleDeleteDiets(el) {
    setInput({
      ...input,
      diets: input.diets?.filter((aux) => aux !== el),
    });
    setErrors(
      validate({
        ...input,
        diets: input.diets?.filter((aux) => aux !== el),
      })
    );
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.nav}>
        <NavBar />
      </div>
      <div className={styles.all}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Create Your Recipe!</h1>
        </div>
        <div className={styles.container}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.recipeDetails}>
              <div className={styles.inputBox}>
                <span className={styles.details}>Recipe Title: </span>
                <input
                  type="text"
                  placeholder="Title"
                  value={input.title}
                  name="title"
                  onChange={(e) => handleChange(e)}
                />
                {errors.title && (
                  <strong>
                    <span className={styles.validationError}>
                      {errors.title}
                    </span>
                  </strong>
                )}
              </div>

              <div className={styles.inputBox}>
                <span className={styles.details}>Summary: </span>
                <input
                  type="text"
                  placeholder="Summary"
                  value={input.summary}
                  name="summary"
                  onChange={(e) => handleChange(e)}
                />
                {errors.summary && (
                  <strong>
                    <span className={styles.validationError}>
                      {errors.summary}
                    </span>
                  </strong>
                )}
              </div>

              <div className={styles.inputBox}>
                <span className={styles.details}>Image: </span>
                <input
                  type="text"
                  placeholder="Image"
                  value={input.image}
                  name="image"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className={styles.inputBox}>
                <span className={styles.details}>Health Score: </span>
                <input
                  type="number"
                  placeholder="0"
                  value={input.healthScore}
                  name="healthScore"
                  onChange={(e) => handleChange(e)}
                />
                {errors.healthScore && (
                  <strong>
                    <span className={styles.validationError}>
                      {errors.healthScore}
                    </span>
                  </strong>
                )}
                {errors.numberError && (
                  <strong>
                    <span className={styles.validationError}>
                      {errors.numberError}
                    </span>
                  </strong>
                )}
              </div>

              <div className={styles.inputBox}>
                <span className={styles.details}>Steps: </span>
                <input
                  type="text"
                  placeholder="Steps"
                  value={input.steps}
                  name="steps"
                  onChange={(e) => handleChange(e)}
                />
                {errors.steps && (
                  <strong>
                    <span className={styles.validationError}>
                      {errors.steps}
                    </span>
                  </strong>
                )}
              </div>

              <div className={styles.inputBox}>
                <span className={styles.details}>Dish Types: </span>
                <input
                  type="text"
                  placeholder="Dish Types"
                  value={input.dishTypes}
                  name="dishTypes"
                  onChange={(e) => handleChange(e)}
                />
                {errors.dishTypes && (
                  <strong>
                    <span className={styles.validationError}>
                      {errors.dishTypes}
                    </span>
                  </strong>
                )}
              </div>
              <div className={styles.optionContainer}>
                <div className={styles.inputBox}>
                  <strong>
                    <span className={styles.details}>Choose Diets:</span>
                  </strong>
                </div>
                <div className={styles.inputBox}>
                  <select name="diets" onChange={(e) => handleSelectDiets(e)}>
                    {types?.map((t, index) => {
                      return (
                        <option key={index} value={t.name}>
                          {t.name}
                        </option>
                      );
                    })}
                  </select>
                  {input.diets?.map((el) => {
                    return (
                      <button
                        className={styles.optionButton}
                        key={el}
                        type="button"
                        onClick={() => handleDeleteDiets(el)}
                      >
                        {el}
                      </button>
                    );
                  })}
                  {errors.diets && (
                    <strong>
                      <span className={styles.validationError}>
                        {errors.diets}
                      </span>
                    </strong>
                  )}
                </div>
              </div>

              <div>
                <button className={styles.createBtn} type="submit">
                  Create Recipe!
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
