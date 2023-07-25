import React from "react";
import classes from "./RecipeItem.module.css";
import { Link } from "react-router-dom";
const RecipeItem = (props) => {
  const { name, description, abv, image, id, onSelect, selectedRecipes } =
    props;
  const selectRecipeHandler = (event) => {
    event.preventDefault();
    onSelect(id);
  };
  return (
    <Link to={`/recipes/${id}`} className={classes.link}>
      <li
        className={`${classes.cart} ${
          selectedRecipes.includes(id) ? classes.active : ""
        }`}
        key={id}
        onContextMenu={selectRecipeHandler}
      >
        <div className={classes.image_container}>
          <img className={classes.image} src={image} alt={name} />
        </div>

        <div className={classes.description}>
          <h2>{name}</h2>

          <p>{description}</p>
        </div>
        <div className={classes.volume}>
          <p>{abv} %</p>
        </div>
      </li>
    </Link>
  );
};

export default RecipeItem;
