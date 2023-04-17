import RecipeList from "./RecipeList";
import Search from "./Search";

export default function RecipesByCuisine() {
  return (
    <div>
      <Search />
      <div>
        Cusinine 1 | Cuisine 2 |
        <RecipeList />
      </div>
    </div>
  );
}
