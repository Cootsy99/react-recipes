import { Link } from "react-router-dom";
import RecipeListItem from "./RecipeListItem";

export default function RecipeList() {
  let testRecipes = ["Recipe 1", "Recipe 2", "Recipe 3"];
  let recipes = testRecipes.map((recipe, index) => {
    return (
      <Link to="/ViewRecipe" key={index}>
        <RecipeListItem recipe={recipe} />
      </Link>
    );
  });
  return (
    <>
      These are my recipes:
      {recipes}
    </>
  );
}
