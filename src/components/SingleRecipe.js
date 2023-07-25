import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBeerStore } from "../app/store";
import classes from "./SingleRecipe.module.css";
const SingleRecipe = () => {
  const [recipeItem, setRecipeItem] = useState(null);
  const { recipeId } = useParams();
  const recipes = useBeerStore((state) => state.recipes);
  useEffect(() => {
    const getSingleRecipe = () => {
      const singleRecipe = recipes.find(
        (recipe) => recipe.id === parseInt(recipeId)
      );
      setRecipeItem(singleRecipe);
    };
    getSingleRecipe();
  }, [recipeId]);

  if (!recipeItem) {
    return <div>Recipe not found.</div>;
  }
  return (
    <div className={classes.container}>
      <div className={classes.image}>
        <img src={recipeItem.image_url} alt={recipeItem.name} />
      </div>
      <div className={classes.recipe}>
        <h2>{recipeItem.name}</h2>
        <div className={classes.content}>
          <h3>Tagline: </h3>
          <p>{recipeItem.tagline}</p>
        </div>
        <div className={classes.content}>
          <h3>Description: </h3>
          <p>{recipeItem.description}</p>
        </div>

        <div className={classes.characteristics}>
          <div className={classes.box}>
            <p>ABV: {recipeItem.abv}</p>
          </div>
          <div className={classes.box}>
            <p>EBC: {recipeItem.ebc}</p>
          </div>

          <div className={classes.box}>
            <p>PH: {recipeItem.ph}</p>
          </div>
          <div className={classes.box}>
            <p>SRM: {recipeItem.srm}</p>
          </div>
          <div className={classes.box}>
            <p>IBU: {recipeItem.ibu}</p>
          </div>
        </div>
        <div className={classes.content}>
          <h3>Brewers tips: </h3>
          <p> {recipeItem.brewers_tips}</p>
        </div>

        <h3>Food pairing:</h3>
        <ul>
          {recipeItem.food_pairing.map((recipe, index) => {
            return <li key={index}>{recipe}</li>;
          })}
        </ul>
        <div className={classes.content}>
          <h3>Contributed by: </h3>
          <p> {recipeItem.contributed_by}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleRecipe;
