import { Link } from "react-router-dom";
import RecipeListItem from "./RecipeListItem";

export default function RecipeList() {
  let testRecipes = [
    {
      name: "Recipe 1",
      picture:
        "/Users/jackcoots/sei/projects/react-recipes/src/placeholderPic.webp",
      cuisine: "Cuisine X",
      category: "Category Y",
    },
  ];
  let recipes = testRecipes.map((recipe, index) => {
    return (
      <Link to="/ViewRecipe" key={index}>
        <RecipeListItem recipe={recipe} />
      </Link>
    );
  });
  return <>{recipes}</>;
}
