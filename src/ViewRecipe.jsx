import { Link } from "react-router-dom";
import RecipeList from "./RecipeList";
import { useLocation } from "react-router-dom";
import "./viewRecipe.css";
import IngredientViewItem from "./IngredientViewItem";
import MethodViewItem from "./MethodViewItem";
import { useEffect, useState } from "react";
import NewIngredient from "./NewIngredient";
import NewStep from "./NewStep";

export default function ViewRecipe(props) {
  const location = useLocation();
  const recipe = location.state ? location.state.info : null;

  const [inMyRecipes, setInMyRecipes] = useState(false);

  useEffect(() => {
    if (props.myRecipes) {
      const ids = props.myRecipes.map((recipe) => recipe.id);
      if (ids.includes(recipe.id)) {
        setInMyRecipes(true);
      } else {
        setInMyRecipes(false);
      }
    }
  }, [props.myRecipes]);

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

  function handleIngredCheckBoxClick(index, event) {
    setCheckedIngredients([...checkedIngredients, index]);
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
              handleCheckBoxClick={handleIngredCheckBoxClick}
              setIngredientsList={setIngredientsList}
              ingredientsList={ingredientsList}
              checkedIngredients={checkedIngredients}
              inMyRecipes={inMyRecipes}
            />
          );
        })
      );
    }
  }, [ingredientsList, checkedIngredients, inMyRecipes]);

  function rerenderRecipe() {
    let rerenderedIngredients = {};
    if (ingredientsList) {
      ingredientsList.forEach((ingredient, i) => {
        rerenderedIngredients[`Ingredient ${i + 1}`] = ingredient;
      });
    }
    let rerenderedRecipe = { ...recipe, ingredients: rerenderedIngredients };
    return rerenderedRecipe;
  }

  useEffect(() => {
    if (props.myRecipes) {
      const renderedRecipe = rerenderRecipe();
      console.log(renderedRecipe);
      props.setMyRecipes(
        props.myRecipes.map((recipeItem) => {
          if (recipe["id"] === recipeItem["id"]) {
            return renderedRecipe;
          } else {
            return recipeItem;
          }
        })
      );
    }
  }, [ingredientsList]);

  function addIngredient(ingredient) {
    setIngredientsList([...ingredientsList, ingredient]);
  }

  function handleDeleteSelectedIngreds() {
    const itemsToRemove = [...ingredientsList].filter((ingredient, index) =>
      checkedIngredients.some((i) => index === i)
    );
    setIngredientsList(
      ingredientsList.filter(
        (ingredient) => !itemsToRemove.includes(ingredient)
      )
    );
  }

  function handleDeleteAllIngreds() {
    setIngredientsList([]);
  }

  /***** METHOD *****/

  const [methodList, setMethodList] = useState(undefined);
  const [stepsToRender, setStepsToRender] = useState([]);
  const [checkedSteps, setCheckedSteps] = useState([]);

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

  function handleStepCheckBoxClick(index, event) {
    setCheckedSteps([...checkedSteps, index]);
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
              handleCheckBoxClick={handleStepCheckBoxClick}
            />
          );
        })
      );
    }
  }, [methodList, checkedSteps]);

  function addStep(step) {
    setMethodList([...methodList, step]);
  }

  function handleDeleteSelectedSteps() {
    const itemsToRemove = [...methodList].filter((step, index) =>
      checkedSteps.some((i) => index === i)
    );
    setMethodList(methodList.filter((step) => !itemsToRemove.includes(step)));
  }

  function handleDeleteAllSteps() {
    setMethodList([]);
  }

  return (
    <div className="pageContainer">
      <div className="topRow">
        <div className="name">{recipe.name}</div>

        <Link className="makeButtonAnchor" to="/MakeRecipe">
          <button className="makeButton">Make this Recipe</button>
        </Link>

        {!inMyRecipes && (
          <button
            className="addRecipeButton"
            onClick={() => {
              props.setMyRecipes([...props.myRecipes, recipe]);
            }}
          >
            Add this to my recipes
          </button>
        )}
        {inMyRecipes && (
          <button
            className="deleteRecipeButton"
            onClick={() => {
              props.setMyRecipes(
                props.myRecipes.filter(
                  (recipeItem) => recipeItem["id"] !== recipe["id"]
                )
              );
            }}
          >
            DELETE RECIPE
          </button>
        )}
      </div>

      <img className="recipeImage" src={recipe.image} />
      <div className="ingredientsAndMethodContainer">
        <div className="ingredientsContainer">
          {inMyRecipes && (
            <button onClick={handleDeleteSelectedIngreds}>
              Delete Selected Ingredients
            </button>
          )}
          {inMyRecipes && (
            <button onClick={handleDeleteAllIngreds}>
              Delete All Ingredients
            </button>
          )}

          <div className="ingredientsLabel">Ingredients</div>
          <ul className="list">{ingredientsToRender}</ul>
          {inMyRecipes && <NewIngredient addIngredient={addIngredient} />}
        </div>
        <div className="methodContainer">
          {inMyRecipes && (
            <button onClick={handleDeleteSelectedSteps}>
              Delete Selected Steps
            </button>
          )}
          {inMyRecipes && (
            <button onClick={handleDeleteAllSteps}>Delete All Steps</button>
          )}
          <div className="methodLabel">Method</div>
          <ul className="list">{stepsToRender}</ul>
          {inMyRecipes && <NewStep addStep={addStep} />}
        </div>
      </div>
    </div>
  );
}
