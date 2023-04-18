import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeList from "./RecipeList";

export default function Home({ myRecipes }) {
  //   const [myRecipeList, setMyRecipeList] = useState(myRecipes);
  //   useEffect(() => {
  //     console.log(myRecipes);
  //     setMyRecipeList(myRecipes);
  //   }, [myRecipes]);

  return (
    <>
      <div>
        <Link to="/AllRecipes">
          <button>All My Recipes</button>
        </Link>
        <Link to="/RecipesByCuisine">
          <button>My Recipes by Cuisine</button>
        </Link>
        <Link to="/RecipesByCategory">
          <button>My Recipes by Category</button>
        </Link>
        <Link to="/AddNewRecipes">
          <button>Add New Recipes</button>
        </Link>
      </div>
      <div>
        {myRecipes ? (
          <>
            {myRecipes.map((item, index) => {
              //   console.log(item["strMeal"]);
              // return <p>Working</p>;
              return <p key={index}>{item["name"]}</p>;
            })}
          </>
        ) : (
          //   <div>Loaded {myRecipes[5]["strMeal"]}</div>
          <div>Waiting</div>
        )}
      </div>
      <div>
        <header>Favorite Recipes</header>
        <RecipeList />
      </div>
    </>
  );
}
