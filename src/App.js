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
import { useEffect, useState } from "react";

function App() {
  const [myRecipes, setMyRecipes] = useState(["test"]);

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

    search: "/search.php?s=",
  };

  const initialRecipes = [
    "Arrabiata",
    "Beef Wellington",
    "Pancakes",
    "Tarte Tatin",
    "Timbits",
    "Irish Stew",
    "Spaghetti Bolognese",
    "Lamb Biryani",
    "Moussaka",
  ];

  // function initialise() {
  //   initialRecipes.forEach((recipe) => {
  //     let fetchedRecipe = api
  //       .fetcher(api.address + api.search + recipe)
  //       .then((result) => result["meals"])
  //       .then((output) => setMyRecipes({ ...myRecipes, output }));
  //   });
  // }

  // initialise();

  useEffect(function () {
    // let calledRecipes = initialRecipes.forEach((recipe) => {
    let fetchedRecipeArr = [];
    // for (let i = 0; i < 10; i++) {
    //   console.log(i);
    // }
    for (const recipe of initialRecipes) {
      api
        .fetcher(api.address + api.search + recipe)
        .then((result) => result["meals"][0])
        .then((output) => fetchedRecipeArr.push(output));
      // console.log(fetchedRecipeArr);
    }
    setMyRecipes(fetchedRecipeArr);
    //   const fetched = api.fetcher(api.address + api.search + recipe);
    //   const result = fetched["meals"][0];
    //   fetchedRecipeArr.push(result);

    // console.log(result);
    // setMyRecipes([...myRecipes, result]);
    // console.log(result["meals"][0]);
    // result["meals"][0];
    // })
    // .then((output) => setMyRecipes([...myRecipes, output]));
    // }
    // console.log(calledRecipes);
    // setMyRecipes({ ...myRecipes, calledRecipes });
  }, []);

  // api
  //   .fetcher(api.address + api.search + "Arrabiata")
  //   .then((result) => result["meals"][0])
  //   .then((output) => console.log(output));

  // async function apiFetch(url) {
  //   const result = await fetch(url);
  //   const output = await result.json();
  //   console.log(output);
  // }

  // api.fetcher(api.address + api.beefWellington);

  // fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata")
  //   .then((result) => result.json())
  //   .then((output) => console.log(output));

  // function initialRecipes() {}

  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home myRecipes={myRecipes} />} />
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
