import { useLocation } from "react-router";
import IngredientViewItem from "./IngredientViewItem";
import MethodViewItem from "./MethodViewItem";

export default function MakeRecipe() {
  const location = useLocation();
  const ingredients = location.state ? location.state.ingredients : null;
  const method = location.state ? location.state.method : null;
  const image = location.state ? location.state.image : null;
  const name = location.state ? location.state.name : null;
  const ingredientPics = location.state ? location.state.ingredientPics : null;

  // console.log(ingredients, method, image, name);

  // console.log(ingredients);
  // console.log(ingredients);

  // function checkForPic(ingredientListItem) {
  //   return ingredients
  //     .map((ingredient) => ingredientListItem.includes(ingredient))
  //     .indexOf(true);
  // }

  // console.log(checkForPic(ingredients[1]));

  const ingredientsToRender = ingredients.map((ingredient, index) => {
    return (
      <IngredientViewItem
        ingredient={ingredient}
        key={index}
        makeRecipe={true}
        // pic={
        //   checkForPic(ingredient) > -1 &&
        //   ingredientPics[`${ingredients[checkForPic(ingredient)]}`]
        // }
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
