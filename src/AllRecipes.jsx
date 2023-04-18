import RecipeList from "./RecipeList";
import Search from "./Search";

export default function AllRecipes({ myRecipes }) {
  return (
    <div>
      <Search />
      <RecipeList myRecipes={myRecipes} />
    </div>
  );
}
