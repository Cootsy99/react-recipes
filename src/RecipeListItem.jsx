import "./RecipeListItem.css";
import "./placeholderPic.jpeg";

export default function RecipeListItem({ recipe }) {
  return (
    <div className="recipeListItem">
      <img src={recipe.image} />
      <div>|</div>
      <h3 className="recipeName">{recipe.name}</h3>
      <div>|</div>
      <h4 className="recipeCuisine">{recipe.cuisine}</h4>
      <div>|</div>
      <h4 className="recipeCategory">{recipe.category}</h4>
    </div>
  );
}
