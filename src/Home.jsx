import "./Home.css";
import { Link } from "react-router-dom";
import RecipeList from "./RecipeList";

export default function Home({ myRecipes }) {
  return (
    <>
      {/* Buttons on homepage */}
      <div className="buttonsContainer">
        <Link to="/AllRecipes">
          <button className="allRecipes navButton">
            <div className="buttonLabelContainer">
              <h3 className="buttonName">All My Recipes</h3>
            </div>
          </button>
        </Link>
        <Link to="/RecipesByCuisine">
          <button className="byCuisine navButton">
            <div className="buttonLabelContainer">
              <h3 className="buttonName">My Recipes by Cuisine</h3>
            </div>
          </button>
        </Link>
        <Link to="/RecipesByCategory">
          <button className="byCategory navButton">
            <div className="buttonLabelContainer">
              <h3 className="buttonName">My Recipes by Category</h3>
            </div>
          </button>
        </Link>
        <Link to="/AddNewRecipes">
          <button className="addNew navButton">
            <div className="buttonLabelContainer">
              <h3 className="buttonName">Add New Recipes</h3>
            </div>
          </button>
        </Link>
      </div>
      {/* Showing favorite recipes (currently just all recipes) */}
      <div>
        <h1>Favorite Recipes</h1>
        {myRecipes ? (
          <RecipeList myRecipes={myRecipes} />
        ) : (
          <h1>Fetching Data</h1>
        )}
      </div>
    </>
  );
}
