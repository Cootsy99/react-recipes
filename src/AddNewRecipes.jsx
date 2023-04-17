import RecipeList from "./RecipeList";
import Search from "./Search";

export default function AddNewRecipes() {
  return (
    <>
      <div>
        <Search />
        <button>Random Recipe</button>
        <button>Make own Recipe</button>
        <RecipeList />
      </div>
      <div>
        Browse by Popular Ingredients | Browse by Category | Browse by Cuisine
      </div>
    </>
  );
}
