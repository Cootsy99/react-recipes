import RecipeList from "./RecipeList";
import Search from "./Search";

export default function RecipesByCategory() {
  return (
    <div>
      <Search />
      <div>
        Category 1 | Category 2 |
        <RecipeList />
      </div>
    </div>
  );
}
