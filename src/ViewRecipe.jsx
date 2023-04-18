import { Link } from "react-router-dom";
import RecipeList from "./RecipeList";
import { useLocation } from "react-router-dom";
import "./viewRecipe.css";
import IngredientViewItem from "./IngredientViewItem";
import MethodViewItem from "./MethodViewItem";
import { useEffect, useState } from "react";
import NewIngredient from "./NewIngredient";

export default function ViewRecipe() {
  const location = useLocation();
  // console.log(location);
  // console.log(!!location.state.info);
  const recipe = location.state ? location.state.info : null;
  // console.log(recipe);
  const [ingredientsList, setIngredientsList] = useState(undefined);
  const [ingredientsToRender, setIngredientsToRender] = useState([]);
  // let ingredients = [];
  // let i = 1;

  // console.log(recipe.ingredients);

  useEffect(() => {
    let ingredients = [];
    for (const ingredient in recipe.ingredients) {
      // console.log(recipe.ingredients[ingredient]);
      ingredients.push(recipe.ingredients[ingredient]);
      // console.log(ingredients);
    }
    setIngredientsList(ingredients);
    // console.log("in use effect");
  }, []);

  // console.log(ingredientsList);

  // function removeIngredient(ingredient) {
  //   console.log(ingredient);
  //   setIngredientsList(
  //     ingredientsList.filter((item) => ingredient.index !== item.key)
  //   );
  // }

  function removeIngredient(index) {
    // console.log(ingredientsList.toSpliced(index, 1));
    setIngredientsList(ingredientsList.toSpliced(index, 1));
    // console.log(ingredientsList);
  }

  useEffect(() => {
    if (ingredientsList) {
      console.log("ingredient list");
      console.log(ingredientsList);
      setIngredientsToRender(
        ingredientsList.map(function (item, index) {
          return (
            <IngredientViewItem
              ingredient={item}
              key={index}
              index={index}
              removeIngredient={removeIngredient}
              // markAsComplete={markAsComplete}
              // removeFromList={removeFromList}
            />
          );
        })
      );
    }
  }, [ingredientsList]);

  function addIngredient(ingredient) {
    setIngredientsList([...ingredientsList, ingredient]);
  }

  // for (const ingredient in recipe.ingredients) {

  //   ingredients.push(recipe.ingredients[ingredient]);

  // ingredients.push(
  //   <IngredientViewItem
  //     key={i}
  //     ingredientNum={ingredient}
  //     ingredient={recipe.ingredients[ingredient]}
  //   ></IngredientViewItem>
  // );
  // i++;

  // }
  // NOTEEEE METHOD STILL NEEDS TO BE RE-RENDERED
  let method = [];
  let j = 1;
  for (const step in recipe.method) {
    // console.log("RAN");
    // console.log(ingredient, recipe.ingredients[ingredient]);
    method.push(
      <MethodViewItem
        key={j}
        stepNum={step}
        step={recipe.method[step]}
      ></MethodViewItem>
    );
    j++;
  }

  return (
    <div className="pageContainer">
      <div className="topRow">
        <div className="name">{recipe.name}</div>

        <Link className="makeButtonAnchor" to="/MakeRecipe">
          <button className="makeButton">Make this Recipe</button>
        </Link>

        <button className="addRecipeButton">Add this to my recipes</button>
      </div>

      {/* <div className="recipeImageContainer"> */}
      <img className="recipeImage" src={recipe.image} />
      {/* </div> */}
      <div className="ingredientsAndMethodContainer">
        <div className="ingredientsContainer">
          <div className="ingredientsLabel">Ingredients</div>

          <ul className="list">{ingredientsToRender}</ul>
          {/* for each ingredient in the recipe, return a list item
           the item should be able to be deleted, edited  */}
          {/* <button className="addIngredientButton" addIngredient={addIngredient}>
            Add Ingredient
          </button> */}
          <NewIngredient addIngredient={addIngredient} />
        </div>
        <div className="methodContainer">
          <div className="methodLabel">Method</div>
          <ul className="list">{method}</ul>

          <button className="addStepButton">Add Step</button>
        </div>
      </div>
    </div>
  );
}
