import { Link } from "react-router-dom";
import RecipeList from "./RecipeList";
import { useLocation } from "react-router-dom";
import "./viewRecipe.css";
import IngredientViewItem from "./IngredientViewItem";
import MethodViewItem from "./MethodViewItem";
import { useEffect, useState } from "react";
import NewIngredient from "./NewIngredient";
import NewStep from "./NewStep";

export default function ViewRecipe() {
  const location = useLocation();
  const recipe = location.state ? location.state.info : null;

  /***** INGREDIENTS *****/
  const [ingredientsList, setIngredientsList] = useState(undefined);
  const [ingredientsToRender, setIngredientsToRender] = useState([]);

  useEffect(() => {
    let ingredients = [];
    for (const ingredient in recipe.ingredients) {
      ingredients.push(recipe.ingredients[ingredient]);
    }
    setIngredientsList(ingredients);
  }, []);

  function removeIngredient(index) {
    setIngredientsList(ingredientsList.toSpliced(index, 1));
  }

  useEffect(() => {
    if (ingredientsList) {
      setIngredientsToRender(
        ingredientsList.map(function (item, index) {
          return (
            <IngredientViewItem
              ingredient={item}
              key={index}
              index={index}
              removeIngredient={removeIngredient}
            />
          );
        })
      );
    }
  }, [ingredientsList]);

  function addIngredient(ingredient) {
    setIngredientsList([...ingredientsList, ingredient]);
  }

  /***** METHOD *****/

  const [methodList, setMethodList] = useState(undefined);
  const [stepsToRender, setStepsToRender] = useState([]);

  useEffect(() => {
    let steps = [];
    for (const step in recipe.method) {
      steps.push(recipe.method[step]);
    }
    setMethodList(steps);
  }, []);

  function removeStep(index) {
    setMethodList(methodList.toSpliced(index, 1));
  }

  useEffect(() => {
    if (methodList) {
      setStepsToRender(
        methodList.map(function (item, index) {
          return (
            <MethodViewItem
              step={item}
              key={index}
              index={index}
              removeStep={removeStep}
            />
          );
        })
      );
    }
  }, [methodList]);

  function addStep(step) {
    setMethodList([...methodList, step]);
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

      <img className="recipeImage" src={recipe.image} />
      <div className="ingredientsAndMethodContainer">
        <div className="ingredientsContainer">
          <div className="ingredientsLabel">Ingredients</div>

          <ul className="list">{ingredientsToRender}</ul>
          <NewIngredient addIngredient={addIngredient} />
        </div>
        <div className="methodContainer">
          <div className="methodLabel">Method</div>
          <ul className="list">{stepsToRender}</ul>
          <NewStep addStep={addStep} />
        </div>
      </div>
    </div>
  );
}
