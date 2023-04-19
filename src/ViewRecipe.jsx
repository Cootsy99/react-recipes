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
  const [checkedIngredients, setCheckedIngredients] = useState([]);

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

  function handleCheckBoxClick(index, event) {
    // console.log(ingredientsList[1]);
    console.log(event.target.checked);
    setCheckedIngredients([...checkedIngredients, index]);
  }

  // useEffect(() => {
  //   handleCheckBoxClic;
  // });
  //   // console.log(ingredientsList[index]);
  //   // console.log([...checkedIngredients, ingredientsList[index]]);
  //   // console.log("before");
  //   // console.log(typeof ingredientsList[index]);
  //   console.log("checkedIngredients", checkedIngredients);
  //   setCheckedIngredients(["Updated"]); //[ingredientsList[index]]]);
  //   console.log("after");
  //   console.log("checkedIngredients", checkedIngredients);
  //   console.log(ingredientsList[index]);

  //   // console.log(checkedIngredients);
  // }

  useEffect(() => {
    if (ingredientsList) {
      // console.log("rerendering");
      // console.log(ingredientsToRender);
      setIngredientsToRender(
        ingredientsList.map(function (item, index) {
          return (
            <IngredientViewItem
              ingredient={item}
              key={index}
              index={index}
              removeIngredient={removeIngredient}
              handleCheckBoxClick={handleCheckBoxClick}
              // setCheckedIngredients={setCheckedIngredients}
              checkedIngredients={checkedIngredients}
            />
          );
        })
      );
      // console.log(ingredientsToRender);
    }
  }, [ingredientsList, checkedIngredients]);

  function addIngredient(ingredient) {
    setIngredientsList([...ingredientsList, ingredient]);
  }

  function handleDeleteSelectedIngreds() {
    const itemsToRemove = [...ingredientsList].filter((ingredient, index) =>
      checkedIngredients.some((i) => index === i)
    );
    console.log(itemsToRemove);
    setIngredientsList(
      ingredientsList.filter(
        (ingredient) => !itemsToRemove.includes(ingredient)
      )
    );
  }

  // z.filter((el,i)=>x.some(j => i === j))

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
          <button onClick={handleDeleteSelectedIngreds}>Delete Selected</button>

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
