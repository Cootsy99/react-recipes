import { useLocation } from "react-router";
import IngredientViewItem from "./IngredientViewItem";
import MethodViewItem from "./MethodViewItem";

export default function MakeRecipe() {
  //getting all of the necessary state info using the useLocation hook
  const location = useLocation();
  const ingredients = location.state ? location.state.ingredients : null;
  const method = location.state ? location.state.method : null;
  const image = location.state ? location.state.image : null;
  const name = location.state ? location.state.name : null;
  //FUNCTIONALITY NOT CURRENTLY IMPLEMENTED
  const ingredientPics = location.state ? location.state.ingredientPics : null;

  //Creating the ingredients components
  const ingredientsToRender = ingredients.map((ingredient, index) => {
    return (
      <IngredientViewItem
        ingredient={ingredient}
        key={index}
        makeRecipe={true}
      />
    );
  });

  //Creating the method components
  const stepsToRender = method.map((step, index) => {
    return <MethodViewItem step={step} key={index} makeRecipe={true} />;
  });

  return (
    <div>
      <h1>{name}</h1>
      <img className="recipeImage" src={image} />
      <h2>Ingredients</h2>
      <ul className="list">{ingredientsToRender}</ul>
      <h2>Method</h2>
      <ul className="list">{stepsToRender}</ul>
    </div>
  );
}
