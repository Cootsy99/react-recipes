import { useState } from "react";
import { Link } from "react-router-dom";
import RecipeList from "./RecipeList";

export default function Home({ myRecipes }) {
  const [myRecipeList, setMyRecipeList] = useState(myRecipes);

  return (
    <>
      <div>
        <Link to="/AllRecipes">
          <button>All My Recipes</button>
        </Link>
        <Link to="/RecipesByCuisine">
          <button>My Recipes by Cuisine</button>
        </Link>
        <Link to="/RecipesByCategory">
          <button>My Recipes by Category</button>
        </Link>
        <Link to="/AddNewRecipes">
          <button>Add New Recipes</button>
        </Link>
      </div>
      <div>
        {myRecipeList.map((item, index) => {
          return <p key={index}>{item["strMeal"]}</p>;
        })}
      </div>
      <div>
        <header>Favorite Recipes</header>
        <RecipeList />
      </div>
    </>
  );
}
