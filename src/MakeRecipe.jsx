import { useLocation } from "react-router";
import IngredientViewItem from "./IngredientViewItem";
import MethodViewItem from "./MethodViewItem";

export default function MakeRecipe() {
  const location = useLocation();
  const ingredients = location.state ? location.state.ingredients : null;
  const method = location.state ? location.state.method : null;
  const image = location.state ? location.state.image : null;
  const name = location.state ? location.state.name : null;

  // console.log(ingredients, method, image, name);

  const ingredientsToRender = ingredients.map((ingredient, index) => {
    return (
      <IngredientViewItem
        ingredient={ingredient}
        key={index}
        makeRecipe={true}
      />
    );
  });

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
