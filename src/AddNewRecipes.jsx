import { useState } from "react";
import "./AddNewRecipes.css";
import RecipeList from "./RecipeList";
import Search from "./Search";

export default function AddNewRecipes({ api }) {
  //setup states
  const [recipesToRender, setRecipesToRender] = useState(undefined);
  const [userSearch, setUserSearch] = useState("Pasta");

  //Gives a search button on the search bar for this component as reuse the same element where we sometimes don't want a search button
  const wantSearchButton = true;

  //searchbar input update
  const handleChange = (event) => setUserSearch(event.target.value);

  //fetches from the api based on the user input
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

  //fetches from the api for a random recipe
  async function handleRandomClick(event) {
    const result = await api.fetcher(api.address + api.random);
    const output = await api.recipeToObjectFn(result["meals"][0]);
    setRecipesToRender([output]);
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
        {/* FUNCTIONALITY NOT YET IMPLEMENTED */}
        {/* <button>Make own Recipe</button> */}
        <RecipeList myRecipes={recipesToRender} />
        {!recipesToRender && <h2>No Recipes Found </h2>}
      </div>
      {/* FUNCTIONALITY NOT YET IMPLEMENTED */}
      <div>
        {/* Browse by Popular Ingredients | Browse by Category | Browse by Cuisine */}
      </div>
    </>
  );
}
