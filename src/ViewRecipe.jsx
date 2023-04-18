import { Link } from "react-router-dom";
import RecipeList from "./RecipeList";
import { useLocation } from "react-router-dom";
import "./viewRecipe.css";

export default function ViewRecipe() {
  const location = useLocation();
  // console.log(location);
  // console.log(!!location.state.info);
  const recipe = location.state ? location.state.info : null;
  console.log(recipe);
  return (
    <div className="pageContainer">
      <div className="topRow">
        <div className="name">{recipe.name}</div>

        <Link className="makeButtonAnchor" to="/MakeRecipe">
          <button className="makeButton">Make this Recipe</button>
        </Link>

        <button className="addRecipeButton">Add this to my recipes</button>
      </div>

      {/* <div className="recipeImageContainer"> */}
      <img className="recipeImage" src={recipe.image} />
      {/* </div> */}
      <div className="ingredientsAndMethodContainer">
        <div className="ingredientsContainer">
          <div className="ingredientsLabel">Ingredients</div>
          {recipe.ingredients[0]}
          <button className="addIngredientButton">Add Ingredient</button>
        </div>
        <div className="methodContainer">
          <div className="methodLabel">Method</div>
          {recipe.method[0]}
          <button className="addStepButton">Add Step</button>
        </div>
      </div>
    </div>
  );
}
