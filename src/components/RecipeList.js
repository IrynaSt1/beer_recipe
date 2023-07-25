import { useBeerStore } from "../app/store";
import { useEffect, useState } from "react";
import shallow from "zustand/shallow";
import RecipeItem from "./RecipeItem";
import classes from "./RecipeList.module.css";

const RecipeList = () => {
  const [renderedRecipes, setRenderedRecipes] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const {
    fetchRecipes,
    recipes,
    setPage,
    deleteRecipes,
    selectRecipe,
    selectedRecipes,
  } = useBeerStore(
    (state) => ({
      fetchRecipes: state.fetchRecipes,
      recipes: state.recipes,
      setPage: state.setPage,
      deleteRecipes: state.deleteRecipes,
      selectRecipe: state.selectRecipe,
      selectedRecipes: state.selectedRecipes,
    }),
    shallow
  );
  useEffect(() => {
    if (recipes.length) {
      setRenderedRecipes(recipes.slice(startIndex, startIndex + 15));
    } else {
      fetchRecipes();
    }
    function getMoreByScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight
      ) {
        if (renderedRecipes.length && renderedRecipes.length < 15) {
          setPage();
          fetchRecipes();
        }
        setStartIndex((prevStartIndex) => prevStartIndex + 5);
      }
    }

    window.addEventListener("scroll", getMoreByScroll);
    return () => {
      window.removeEventListener("scroll", getMoreByScroll);
    };
  }, [recipes, startIndex]);

  const onDeleteButtonClick = () => {
    const filteredDataForShortRecipes = renderedRecipes.filter(
      (item) => !selectedRecipes.includes(item.id)
    );
    const filteredDataRecipes = recipes.filter(
      (item) => !selectedRecipes.includes(item.id)
    );
    deleteRecipes(filteredDataRecipes);
    setRenderedRecipes(filteredDataForShortRecipes);
  };
  return (
    <>
      {selectedRecipes.length ? (
        <button
          className={classes.button}
          type="button"
          onClick={onDeleteButtonClick}
        >
          Delete
        </button>
      ) : null}

      <div className={classes.container}>
        <ul className={classes.list}>
          {renderedRecipes.map((item) => (
            <RecipeItem
              key={item.id}
              id={item.id}
              image={item.image_url}
              name={item.name}
              description={item.description}
              abv={item.abv}
              onSelect={selectRecipe}
              selectedRecipes={selectedRecipes}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
export default RecipeList;
