import { Link } from "react-router-dom";
import RecipeListItem from "./RecipeListItem";

export default function RecipeList(props) {
  let testRecipes = [
    {
      name: "Recipe 1",
      picture:
        "/Users/jackcoots/sei/projects/react-recipes/src/placeholderPic.webp",
      cuisine: "American",
      category: "Chicken",
    },
    {
      name: "Recipe 2",
      picture:
        "/Users/jackcoots/sei/projects/react-recipes/src/placeholderPic.webp",
      cuisine: "British",
      category: "Pork",
    },
  ];
  let recipes = testRecipes
    .filter(
      (recipe) =>
        recipe.cuisine === props.active || recipe.category === props.active
    )
    .map((recipe, index) => {
      return (
        <Link to="/ViewRecipe" key={index}>
          <RecipeListItem recipe={recipe} />
        </Link>
      );
    });
  return <>{recipes}</>;
}
