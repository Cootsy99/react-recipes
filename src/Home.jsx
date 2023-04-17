import { Link } from "react-router-dom";
import RecipeList from "./RecipeList";

export default function Home() {
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
        <header>Favorite Recipes</header>
        <RecipeList></RecipeList>
      </div>
    </>
  );
}
