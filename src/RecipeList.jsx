import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeListItem from "./RecipeListItem";

export default function RecipeList(props) {
  //setup state
  const [recipesToRender, setRecipesToRender] = useState(undefined);

  //Updates recipe list if there are any edits/additions/deletions of myrecipes
  useEffect(() => {
    setRecipesToRender(props.myRecipes);
  }, [props.myRecipes]);

  //generates the recipes to show, this depends on the active tab in the recipe by cuisine/category section
  let recipes;
  if (recipesToRender) {
    recipes = recipesToRender
      .filter((recipe) =>
        props.active
          ? recipe.cuisine === props.active || recipe.category === props.active
          : true
      )
      .map((recipe, index) => {
        return (
          <Link
            to="/ViewRecipe"
            key={index}
            state={recipe ? { info: recipe } : { info: "no data" }}
          >
            <RecipeListItem recipe={recipe} />
          </Link>
        );
      });
  }

  return <>{recipes}</>;
}
