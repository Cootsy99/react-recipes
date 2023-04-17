import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <Link to="/"> Home </Link>
      &nbsp; | &nbsp;
      <Link to="/AllRecipes"> All My Recipes </Link>
      &nbsp; | &nbsp;
      <Link to="/RecipesByCuisine"> My Recipes by Cuisine </Link>
      &nbsp; | &nbsp;
      <Link to="/RecipesByCategory"> My Recipes by Category </Link>
      &nbsp; | &nbsp;
      <Link to="/AddNewRecipes"> Add New Recipes </Link>
    </nav>
  );
}
