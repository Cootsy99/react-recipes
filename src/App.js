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
  const apiAddress = "www.themealdb.com/api/json/v1/1";
  const arrabiataAddress = `${apiAddress}/search.php?s=Arrabiata`;

  async function apiFetch(url) {
    const result = await fetch(url);
    const output = await result.json();
    // console.log(output);
  }

  // apiFetch(arrabiataAddress);

  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata")
    .then((result) => result.json())
    .then((output) => console.log(output));

  // async function apiFetchAsync(url, elementToUpdate) {
  //   const result = await fetch(url);
  //   const output = await result.json();
  //   console.log(output);
  // elementToUpdate.setAttribute("src", output[0].url);
  // }

  // const myAPIKey = `live_zFCXhNaj8NgM4yhZivUiTBrTdGmnl8KDDliRaTXuiT63AOvRDv03CJ4tjtV8ewSD`;
  // const randomURL = `https://api.thecatapi.com/v1/images/search?api_key=${myAPIKey}}`;
  // apiFetchAsync(randomURL);

  let myRecipes = {};

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
        <Route path="/MakeRecipe" element={<MakeRecipe />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
