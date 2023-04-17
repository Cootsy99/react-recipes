import "./RecipeListItem.css";
import "./placeholderPic.jpeg";

export default function RecipeListItem({ recipe }) {
  return (
    <div className="recipeListItem">
      <img src={recipe.picture} />
      <div>|</div>
      <div>{recipe.name}</div>
      <div>|</div>
      <div>{recipe.cuisine}</div>
      <div>|</div>
      <div>{recipe.category}</div>
    </div>
  );
}
