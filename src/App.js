import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import AllRecipes from "./AllRecipes";
import RecipesByCuisine from "./RecipesByCuisine";
import RecipesByCategory from "./RecipesByCategory";
import AddNewRecipes from "./AddNewRecipes";
import ViewRecipe from "./ViewRecipe";
import MakeRecipe from "./MakeRecipe";
import PageNotFound from "./PageNotFound";

function App() {
  const api = {
    address: "https://www.themealdb.com/api/json/v1/1",
    fetcher: async function apiFetch(url) {
      const result = await fetch(url);
      const output = await result.json();
      return output;
    },
    // cuisineListAddress: this.address + "/list.php?a=list",
    // cuisineList: this.fetcher(this.cuisineListAddress),

    // console.log(output);

    arrabiata: "/search.php?s=Arrabiata",
  };
  // const apiAddress = "https://www.themealdb.com/api/json/v1/1";
  // const arrabiataAddress = `${apiAddress}/search.php?s=Arrabiata`;

  // async function apiFetch(url) {
  //   const result = await fetch(url);
  //   const output = await result.json();
  //   console.log(output);
  // }

  api.fetcher(api.address + api.arrabiata);

  // fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata")
  //   .then((result) => result.json())
  //   .then((output) => console.log(output));

  let myRecipes = {};

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AllRecipes" element={<AllRecipes />} />
        <Route
          path="/RecipesByCuisine"
          element={<RecipesByCuisine api={api} />}
        />
        <Route
          path="/RecipesByCategory"
          element={<RecipesByCategory api={api} />}
        />
        <Route path="/AddNewRecipes" element={<AddNewRecipes />} />
        <Route path="/ViewRecipe" element={<ViewRecipe />} />
        <Route path="/MakeRecipe" element={<MakeRecipe />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
