import { useEffect, useState } from "react";
import RecipeList from "./RecipeList";
import Search from "./Search";

export default function AllRecipes({ myRecipes }) {
  // setup states
  const [userSearch, setUserSearch] = useState("");

  const [recipesToRender, setRecipesToRender] = useState(undefined);

  //searchbar input update
  const handleChange = (event) => setUserSearch(event.target.value);

  //ensures that we are updating the list of recipes every time a recipe is changed/added/removed
  useEffect(() => {
    setRecipesToRender(myRecipes);
  }, [myRecipes]);

  //search bar filter functionality
  let recipes;
  if (recipesToRender) {
    if (userSearch) {
      recipes = myRecipes.filter(
        (recipe) =>
          recipe["name"].toLowerCase().indexOf(userSearch.toLowerCase()) > -1 ||
          recipe["cuisine"].toLowerCase().indexOf(userSearch.toLowerCase()) >
            -1 ||
          recipe["category"].toLowerCase().indexOf(userSearch.toLowerCase()) >
            -1
      );
    } else {
      recipes = recipesToRender;
    }
  }

  return (
    <div>
      <Search userSearch={userSearch} handleChange={handleChange} />
      <RecipeList myRecipes={recipes} />
    </div>
  );
}
