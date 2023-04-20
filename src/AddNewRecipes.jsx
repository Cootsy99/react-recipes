import { useState } from "react";
import "./AddNewRecipes.css";
import RecipeList from "./RecipeList";
import Search from "./Search";

export default function AddNewRecipes({ api }) {
  const wantSearchButton = true;
  const [recipesToRender, setRecipesToRender] = useState(undefined);
  const [userSearch, setUserSearch] = useState("Pasta");
  const handleChange = (event) => setUserSearch(event.target.value);

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await api.fetcher(api.address + api.search + userSearch);
    if (result["meals"]) {
      let fetchedRecipeArr = [];
      for (const recipe of result["meals"]) {
        fetchedRecipeArr.push(api.recipeToObjectFn(recipe));
      }
      setRecipesToRender(fetchedRecipeArr);
    } else {
      setRecipesToRender(undefined);
    }
  }

  async function handleRandomClick(event) {
    const result = await api.fetcher(api.address + api.random);
    const output = await api.recipeToObjectFn(result["meals"][0]);
    console.log(output);
    setRecipesToRender([output]);
    console.log(recipesToRender);
  }

  return (
    <>
      <div className="searchRow">
        <Search
          value={userSearch}
          handleChange={handleChange}
          wantSearchButton={wantSearchButton}
          handleSubmit={handleSubmit}
        />
        <button className="random" onClick={handleRandomClick}>
          Random Recipe
        </button>
        {/* <button>Make own Recipe</button> */}
        <RecipeList myRecipes={recipesToRender} />
        {!recipesToRender && <h2>No Recipes Found </h2>}
      </div>
      <div>
        {/* Browse by Popular Ingredients | Browse by Category | Browse by Cuisine */}
      </div>
    </>
  );
}
