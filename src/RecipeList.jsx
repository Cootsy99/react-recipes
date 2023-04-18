import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeListItem from "./RecipeListItem";

export default function RecipeList(props) {
  const [recipesToRender, setRecipesToRender] = useState(undefined);
  useEffect(() => {
    setRecipesToRender(props.myRecipes);
    // console.log(props.myRecipes);
  }, [props.myRecipes]);
  let testRecipes = [
    {
      name: "Recipe 1",
      picture:
        "/Users/jackcoots/sei/projects/react-recipes/src/placeholderPic.webp",
      cuisine: "American",
      category: "Chicken",
    },
    {
      name: "Recipe 2",
      picture:
        "/Users/jackcoots/sei/projects/react-recipes/src/placeholderPic.webp",
      cuisine: "British",
      category: "Pork",
    },
  ];

  //   props.active ? console.log("yes") : console.log("no");
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
          <Link to="/ViewRecipe" key={index}>
            <RecipeListItem recipe={recipe} />
          </Link>
        );
      });
  }
  return <>{recipes}</>;
}
