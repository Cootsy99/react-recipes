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

  // console.log(recipe);

  const [inMyRecipes, setInMyRecipes] = useState(false);
  const [renderedRecipe, setRenderedRecipe] = useState(recipe);

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

  // console.log(props.myIngredients);
  function checkForPic(ingredientListItem) {
    // console.log(ingredientListItem);

    return props.myIngredients
      .map((ingredient) => ingredientListItem.includes(ingredient))
      .indexOf(true);
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

  useEffect(() => {
    if (props.myRecipes) {
      const renderedRecipe = rerenderRecipeForIngreds();
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
        <div className="name">
          <h1>{recipe.name}</h1>
        </div>

        <Link
          className="makeButtonAnchor"
          to="/MakeRecipe"
          state={
            ingredientsList && methodList && recipe
              ? {
                  ingredients: ingredientsList,
                  method: methodList,
                  image: recipe["image"],
                  name: recipe["name"],
                }
              : {
                  ingredients: undefined,
                  method: undefined,
                  image: undefined,
                  name: undefined,
                } //,
            // methodList ? { method: methodList } : { method: undefined }) //,
            // recipe
            //   ? { image: recipe["image"], name: recipe["name"] }
            //   : { image: undefined, name: undefined })
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
      {/* <img src={"https://www.themealdb.com/images/ingredients/mushrooms.png"} /> */}
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
