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
  const [myRecipes, setMyRecipes] = useState(undefined);
  const [myIngredients, setMyIngredients] = useState([]);
  const [ingredientPics, setIngredientPics] = useState({});
  const [activeTab, setActiveTab] = useState("Home");

  // console.log(window.location);
  const location = useLocation();

  // console.log(window.location);

  useEffect(() => {
    const pageKeywords = ["Category", "All", "Cuisine", "New"];
    const currentPage = pageKeywords.filter((keyWord) =>
      window.location.href.includes(keyWord)
    );
    window.location.href.slice(-1) === "/"
      ? setActiveTab("Home")
      : setActiveTab(currentPage[0]);
  }, [window.location.href]);

  // console.log(window.location.href.includes("Category"));

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
      // console.log(apiFetch[`strIngredient${i + 1}`]);
      ingredientsAndQuantity[`Ingredient ${i + 1}`] = `${
        apiFetch[`strMeasure${i + 1}`]
      } ${apiFetch[`strIngredient${i + 1}`]}`;
      ingredientsForPics.push(apiFetch[`strIngredient${i + 1}`]);
    }
    // console.log("run");
    // console.log(myIngredients);
    // setMyIngredients([...myIngredients, "test"]);
    // console.log(ingredients);

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

  async function initialiser() {
    let fetchedRecipeArr = [];
    for (const recipe of initialRecipes) {
      const result = await api.fetcher(api.address + api.search + recipe);
      fetchedRecipeArr.push(apiFetchToRecipeObject(result["meals"][0]));
    }
    return fetchedRecipeArr;
  }

  useEffect(() => {
    initialiser().then((result) => setMyRecipes(result));
  }, []);

  useEffect(() => {
    let ingredientUrls = {};
    let ingredients = [];
    if (myRecipes) {
      myRecipes.forEach((recipe) => {
        recipe.ingredientsForPics.forEach((ingredient) => {
          // console.log(ingredient);
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

  // useEffect(() =>{

  // })

  let meal = {
    idMeal: "52771",
    strMeal: "Spicy Arrabiata Penne",
    strDrinkAlternate: null,
    strCategory: "Vegetarian",
    strArea: "Italian",
    strInstructions:
      "Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes.\r\nIn a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped ...",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
    strTags: "Pasta,Curry",
    strYoutube: "https://www.youtube.com/watch?v=1IszT_guI08",
    strIngredient1: "penne rigate",
    strIngredient2: "olive oil",
    strIngredient3: "garlic",
    strIngredient4: "chopped tomatoes",
    strIngredient5: "red chile flakes",
    strIngredient6: "italian seasoning",
    strIngredient7: "basil",
    strIngredient8: "Parmigiano-Reggiano",
    strIngredient9: "",
    strIngredient10: "",
    strIngredient11: "",
    strIngredient12: "",
    strIngredient13: "",
    strIngredient14: "",
    strIngredient15: "",
    strIngredient16: null,
    strIngredient17: null,
    strIngredient18: null,
    strIngredient19: null,
    strIngredient20: null,
    strMeasure1: "1 pound",
    strMeasure2: "1/4 cup",
    strMeasure3: "3 cloves",
    strMeasure4: "1 tin ",
    strMeasure5: "1/2 teaspoon",
    strMeasure6: "1/2 teaspoon",
    strMeasure7: "6 leaves",
    strMeasure8: "spinkling",
    strMeasure9: "",
    strMeasure10: "",
    strMeasure11: "",
    strMeasure12: "",
    strMeasure13: "",
    strMeasure14: "",
    strMeasure15: "",
    strMeasure16: null,
    strMeasure17: null,
    strMeasure18: null,
    strMeasure19: null,
    strMeasure20: null,
    strSource: null,
    strImageSource: null,
    strCreativeCommonsConfirmed: null,
    dateModified: null,
  };

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
