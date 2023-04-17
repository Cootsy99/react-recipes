import { Link } from "react-router-dom";
import RecipeList from "./RecipeList";

export default function ViewRecipe() {
  return (
    <div>
      Recipe Name
      <Link to="/MakeRecipe">
        <button>Make this Recipe</button>
      </Link>
      <button>Add this to my recipes</button>
      Picture Ingredients
      <RecipeList />
      <button>Add Ingredient</button>
      Method
      <RecipeList />
      <button>Add Step</button>
    </div>
  );
}
