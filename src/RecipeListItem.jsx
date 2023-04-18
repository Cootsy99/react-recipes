import "./RecipeListItem.css";
import "./placeholderPic.jpeg";

export default function RecipeListItem({ recipe }) {
  return (
    <div className="recipeListItem">
      <img src={recipe.image} />
      <div>|</div>
      <div className="recipeName">{recipe.name}</div>
      <div>|</div>
      <div className="recipeCuisine">{recipe.cuisine}</div>
      <div>|</div>
      <div className="recipeCategory">{recipe.category}</div>
    </div>
  );
}
