import "./RecipeListItem.css";
import "./placeholderPic.jpeg";

export default function RecipeListItem({ recipe }) {
  return (
    <div className="recipeListItem">
      <img src={recipe.image} />
      <div>|</div>
      <h3 className="recipeName">{recipe.name}</h3>
      <div>|</div>
      <h3 className="recipeCuisine">{recipe.cuisine}</h3>
      <div>|</div>
      <h3 className="recipeCategory">{recipe.category}</h3>
    </div>
  );
}
