import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import AllRecipes from "./AllRecipes";
import RecipesByCuisine from "./RecipesByCuisine";
import RecipesByCategory from "./RecipesByCategory";
import AddNewRecipes from "./AddNewRecipes";
import ViewRecipe from "./ViewRecipe";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AllRecipes" element={<AllRecipes />} />
        <Route path="/RecipesByCuisine" element={<RecipesByCuisine />} />
        <Route path="/RecipesByCategory" element={<RecipesByCategory />} />
        <Route path="/AddNewRecipes" element={<AddNewRecipes />} />
        <Route path="/ViewRecipe" element={<ViewRecipe />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
