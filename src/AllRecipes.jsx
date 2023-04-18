import { useEffect, useState } from "react";
import RecipeList from "./RecipeList";
import Search from "./Search";

export default function AllRecipes({ myRecipes }) {
  const [userSearch, setUserSearch] = useState("");
  const [recipesToRender, setRecipesToRender] = useState(undefined);
  const handleChange = (event) => setUserSearch(event.target.value);

  useEffect(() => {
    setRecipesToRender(myRecipes);
  }, [myRecipes]);

  //   console.log(myRecipes[0]["name"].toLowerCase()); //.indexOf(String(userSearch).toLowerCase())

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

  //   console.log(recipes);

  //   let recipesToRender = myRecipes;

  return (
    <div>
      <Search userSearch={userSearch} handleChange={handleChange} />
      <RecipeList myRecipes={recipes} />
    </div>
  );
}
