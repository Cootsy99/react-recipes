import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./viewRecipe.css";
import IngredientViewItem from "./IngredientViewItem";
import MethodViewItem from "./MethodViewItem";
import { useEffect, useState } from "react";
import NewIngredient from "./NewIngredient";
import NewStep from "./NewStep";

export default function ViewRecipe(props) {
  //getting relevant state info using the useLocation hook
  const location = useLocation();
  const recipe = location.state ? location.state.info : null;

  //setup page state
  const [inMyRecipes, setInMyRecipes] = useState(false);

  //updates whether the recipe in question is in our recipe book or not
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

  //function that helps put recipe list in alphabetical order
  function compare(recipe1, recipe2) {
    if (recipe1.name < recipe2.name) {
      return -1;
    }
    if (recipe1.name > recipe2.name) {
      return 1;
    }
    return 0;
  }

  /***** INGREDIENTS *****/
  //setup ingredient related states
  const [ingredientsList, setIngredientsList] = useState(undefined);
  const [ingredientsToRender, setIngredientsToRender] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  //setup ingredients list initially
  useEffect(() => {
    let ingredients = [];
    for (const ingredient in recipe.ingredients) {
      ingredients.push(recipe.ingredients[ingredient]);
    }
    setIngredientsList(ingredients);
  }, []);

  //function that deals with the remove ingredient button
  function removeIngredient(index) {
    setIngredientsList(ingredientsList.toSpliced(index, 1));
  }

  //function that deals with a checkbox tick
  function handleIngredCheckBoxClick(index, event) {
    setCheckedIngredients([...checkedIngredients, index]);
  }

  //function that finds the index of the ingredient and corresponding picture
  function checkForPic(ingredientListItem) {
    return props.myIngredients
      .map((ingredient) => ingredientListItem.includes(ingredient))
      .indexOf(true);
  }

  //Updates the list of ingredient list items that are required to be rendered depending on various changes
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
              pic={
                checkForPic(item) > -1 &&
                props.ingredientPics[
                  `${props.myIngredients[checkForPic(item)]}`
                ]
              }
            />
          );
        })
      );
    }
  }, [ingredientsList, checkedIngredients, inMyRecipes, props.myIngredients]);

  //helps when we need to update the recipe state when relevant so any edits are updated everywhere in the recipe book
  function rerenderRecipeForIngreds() {
    let rerenderedIngredients = {};
    if (ingredientsList) {
      ingredientsList.forEach((ingredient, i) => {
        rerenderedIngredients[`Ingredient ${i + 1}`] = ingredient;
      });
    }
    let rerenderedRecipe = { ...recipe, ingredients: rerenderedIngredients };
    return rerenderedRecipe;
  }

  //uses the above function to actually update the myrecipe state when there is a change to our ingredients list
  useEffect(() => {
    if (props.myRecipes) {
      const renderedRecipe = rerenderRecipeForIngreds();
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

  //deals with the add ingredient button
  function addIngredient(ingredient) {
    setIngredientsList([...ingredientsList, ingredient]);
  }

  //deals with the delete selected ingredients button
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

  //deals with delete all ingredients button
  function handleDeleteAllIngreds() {
    setIngredientsList([]);
  }

  /***** METHOD *****/
  //setup method related states
  const [methodList, setMethodList] = useState(undefined);
  const [stepsToRender, setStepsToRender] = useState([]);
  const [checkedSteps, setCheckedSteps] = useState([]);

  //setup method list initially
  useEffect(() => {
    let steps = [];
    for (const step in recipe.method) {
      steps.push(recipe.method[step]);
    }
    setMethodList(steps);
  }, []);

  //function that deals with the remove step button
  function removeStep(index) {
    setMethodList(methodList.toSpliced(index, 1));
  }

  //function that deals with a checkbox tick
  function handleStepCheckBoxClick(index, event) {
    setCheckedSteps([...checkedSteps, index]);
  }

  //Updates the list of step items that are required to be rendered depending on various changes
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
              setMethodList={setMethodList}
              methodList={methodList}
              checkedSteps={checkedSteps}
              inMyRecipes={inMyRecipes}
            />
          );
        })
      );
    }
  }, [methodList, checkedSteps, inMyRecipes]);

  //helps when we need to update the recipe state when relevant so any edits are updated everywhere in the recipe book
  function rerenderRecipeForMethod() {
    let rerenderedMethod = {};
    if (methodList) {
      methodList.forEach((step, i) => {
        rerenderedMethod[`Step ${i + 1}`] = step;
      });
    }
    let rerenderedRecipe = { ...recipe, method: rerenderedMethod };
    return rerenderedRecipe;
  }

  //uses the above function to actually update the myrecipe state when there is a change to our method
  useEffect(() => {
    if (props.myRecipes) {
      const renderedRecipe = rerenderRecipeForMethod();
      // console.log(renderedRecipe);
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
  }, [methodList]);

  //deals with the add step button
  function addStep(step) {
    setMethodList([...methodList, step]);
  }

  //deals with the delete selected steps button
  function handleDeleteSelectedSteps() {
    const itemsToRemove = [...methodList].filter((step, index) =>
      checkedSteps.some((i) => index === i)
    );
    setMethodList(methodList.filter((step) => !itemsToRemove.includes(step)));
  }

  //deals with delete all steps button
  function handleDeleteAllSteps() {
    setMethodList([]);
  }

  return (
    <div className="pageContainer">
      <div className="topRow">
        <div className="name">
          <h1>{recipe.name}</h1>
        </div>

        <Link
          className="makeButtonAnchor"
          to="/MakeRecipe"
          // Passes relevant state info to the make recipe component
          state={
            ingredientsList && methodList && recipe
              ? {
                  ingredients: ingredientsList,
                  method: methodList,
                  image: recipe["image"],
                  name: recipe["name"],
                  ingredientPics: props.ingredientPics,
                }
              : {
                  ingredients: undefined,
                  method: undefined,
                  image: undefined,
                  name: undefined,
                  ingredientPics: undefined,
                }
          }
        >
          <button className="makeButton">Make This Recipe</button>
        </Link>

        {!inMyRecipes && (
          <button
            className="addRecipeButton"
            onClick={() => {
              props.setMyRecipes([...props.myRecipes, recipe].sort(compare));
            }}
          >
            Add This To My Recipes
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
            Delete Recipe
          </button>
        )}
      </div>

      <img className="recipeImage" src={recipe.image} />
      <div className="ingredientsAndMethodContainer">
        <div className="ingredientsContainer">
          <h2 className="ingredientsLabel">Ingredients</h2>

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

          <ul className="list">{ingredientsToRender}</ul>
          {inMyRecipes && <NewIngredient addIngredient={addIngredient} />}
        </div>
        <div className="methodContainer">
          <h2 className="methodLabel">Method</h2>

          {inMyRecipes && (
            <button onClick={handleDeleteSelectedSteps}>
              Delete Selected Steps
            </button>
          )}
          {inMyRecipes && (
            <button onClick={handleDeleteAllSteps}>Delete All Steps</button>
          )}
          <ul className="list">{stepsToRender}</ul>
          {inMyRecipes && <NewStep addStep={addStep} />}
        </div>
      </div>
    </div>
  );
}
