import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="NavBar">
      <div className="NavContainer">
        <Link to="/"> Home </Link>
        &nbsp; | &nbsp;
        <Link to="/AllRecipes"> All My Recipes </Link>
        &nbsp; | &nbsp;
        <Link to="/RecipesByCuisine"> My Recipes by Cuisine </Link>
        &nbsp; | &nbsp;
        <Link to="/RecipesByCategory"> My Recipes by Category </Link>
        &nbsp; | &nbsp;
        <Link to="/AddNewRecipes"> Add New Recipes </Link>
      </div>
    </nav>
  );
}
