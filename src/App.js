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
import { useLocation } from "react-router-dom";

function App() {
  //Setting up states
  const [myRecipes, setMyRecipes] = useState(undefined);

  const [myIngredients, setMyIngredients] = useState([]);

  const [ingredientPics, setIngredientPics] = useState({});

  const [activeTab, setActiveTab] = useState("Home");

  const location = useLocation();

  // Updates active tab based on url
  useEffect(() => {
    const pageKeywords = ["Category", "All", "Cuisine", "New"];

    const currentPage = pageKeywords.filter((keyWord) =>
      window.location.href.includes(keyWord)
    );

    window.location.href.slice(-1) === "/"
      ? setActiveTab("Home")
      : setActiveTab(currentPage[0]);
  }, [window.location.href]);

  //function that takes the api raw data and converts into usable object
  const apiFetchToRecipeObject = (apiFetch) => {
    let numIngredients = 1;

    while (
      apiFetch[`strIngredient${numIngredients}`] &&
      apiFetch[`strIngredient${numIngredients}`].length > 0
    ) {
      numIngredients++;
    }
    numIngredients--;

    let ingredientsAndQuantity = {};
    let ingredientsForPics = [];

    for (let i = 0; i < numIngredients; i++) {
      ingredientsAndQuantity[`Ingredient ${i + 1}`] = `${
        apiFetch[`strMeasure${i + 1}`]
      } ${apiFetch[`strIngredient${i + 1}`]}`;

      ingredientsForPics.push(apiFetch[`strIngredient${i + 1}`]);
    }

    let methodArr = apiFetch.strInstructions.match(/[^\.]+[\.]+/g);
    let steps = {};

    methodArr.forEach((step, index) => (steps[`Step ${index + 1}`] = step));

    let recipeObject = {
      id: apiFetch.idMeal,
      name: apiFetch.strMeal,
      category: apiFetch.strCategory,
      cuisine: apiFetch.strArea,
      ingredients: ingredientsAndQuantity,
      method: steps,
      image: apiFetch.strMealThumb,
      ingredientsForPics: ingredientsForPics,
    };
    return recipeObject;
  };

  //useful object that stores info around api
  const api = {
    address: "https://www.themealdb.com/api/json/v1/1",
    fetcher: async function apiFetch(url) {
      const result = await fetch(url);
      const output = await result.json();
      return output;
    },
    recipeToObjectFn: apiFetchToRecipeObject,
    search: "/search.php?s=",
    random: "/random.php",
    ingredientPic: "www.themealdb.com/images/ingredients/",
  };

  //List of recipes fetched upon loading up application
  const initialRecipes = [
    "BBQ Pork Sloppy Joes",
    "Beef Wellington",
    "Beef stroganoff",
    "Bitterballen (Dutch meatballs)",
    "Cajun spiced fish tacos",
    "Chick-Fil-A Sandwich",
    "Corba",
    "Creamy Tomato Soup",
    "Croatian lamb peka",
    "English Breakfast",
    "Fish pie",
    "Irish Stew",
    "Jerk chicken with rice & peas",
    "Katsu Chicken curry",
    "Kung Pao Chicken",
    "Lamb Biryani",
    "Leblebi Soup",
    "Massaman Beef curry",
    "Mbuzi Choma",
    "Moroccan Carrot Soup",
    "Moussaka",
    "Mulukhiyah",
    "Nasi lemak",
    "Pancakes",
    "Piri",
    "Potato Gratin with Chicken",
    "Rogaliki (Polish Croissant Cookies)",
    "Spanish Tortilla",
    "Split Pea Soup",
    "Spaghetti Bolognese",
    "Spaghetti alla Carbonara",
    "Arrabiata",
    "Tarte Tatin",
    "Three-cheese souffles",
    "Timbits",
    "Vegan Chocolate Cake",
    "Vietnamese Grilled Pork",
  ];

  //function that deals with initial API request
  async function initialiser() {
    let fetchedRecipeArr = [];
    for (const recipe of initialRecipes) {
      const result = await api.fetcher(api.address + api.search + recipe);
      fetchedRecipeArr.push(apiFetchToRecipeObject(result["meals"][0]));
    }
    return fetchedRecipeArr;
  }

  //updates the recipe list state once initial api request is complete
  useEffect(() => {
    initialiser().then((result) => setMyRecipes(result));
  }, []);

  //updates list of ingredients in my recipes and the corresponding urls
  useEffect(() => {
    let ingredientUrls = {};
    let ingredients = [];
    if (myRecipes) {
      myRecipes.forEach((recipe) => {
        recipe.ingredientsForPics.forEach((ingredient) => {
          if (
            !myIngredients.includes(ingredient) &&
            !ingredients.includes(ingredient)
          ) {
            ingredientUrls[
              `${ingredient}`
            ] = `www.themealdb.com/images/ingredients/${ingredient}.png`;
            ingredients.push(ingredient);
          }
        });
      });
    }

    setIngredientPics({ ...ingredientPics, ...ingredientUrls });
    setMyIngredients([...myIngredients, ...ingredients]);
  }, [myRecipes]);

  //setting up router links
  return (
    <div className="App">
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <Routes>
        <Route path="/" element={<Home myRecipes={myRecipes} />} />
        <Route
          path="/AllRecipes"
          element={<AllRecipes myRecipes={myRecipes} />}
        />
        <Route
          path="/RecipesByCuisine"
          element={<RecipesByCuisine api={api} myRecipes={myRecipes} />}
        />
        <Route
          path="/RecipesByCategory"
          element={<RecipesByCategory api={api} myRecipes={myRecipes} />}
        />
        <Route path="/AddNewRecipes" element={<AddNewRecipes api={api} />} />
        <Route
          path="/ViewRecipe"
          element={
            <ViewRecipe
              setMyRecipes={setMyRecipes}
              myRecipes={myRecipes}
              myIngredients={myIngredients}
              ingredientPics={ingredientPics}
            />
          }
        />
        <Route path="/MakeRecipe" element={<MakeRecipe />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
