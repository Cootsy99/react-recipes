import { useEffect, useState } from "react";
import RecipeList from "./RecipeList";
import Search from "./Search";
import Tab from "./Tab";
import "./RecipesByCategory.css";

export default function RecipesByCategory({ api, myRecipes }) {
  //setup states
  const [categoryList, setCategoryList] = useState([]);

  const [active, setActive] = useState([]);

  const [userSearch, setUserSearch] = useState("");

  const [recipesToRender, setRecipesToRender] = useState(undefined);

  //category api address
  const categoryListAddress = api.address + "/list.php?c=list";

  //searchbar input update
  const handleChange = (event) => setUserSearch(event.target.value);

  //updates the list of recipes whenever the prop is updated
  useEffect(() => {
    setRecipesToRender(myRecipes);
  }, [myRecipes]);

  //deals with user search input
  let recipes;
  if (recipesToRender) {
    if (userSearch) {
      recipes = myRecipes.filter(
        (recipe) =>
          recipe["name"].toLowerCase().indexOf(userSearch.toLowerCase()) > -1 ||
          recipe["cuisine"].toLowerCase().indexOf(userSearch.toLowerCase()) >
            -1 ||
          recipe["category"].toLowerCase().indexOf(userSearch.toLowerCase()) >
            -1
      );
    } else {
      recipes = recipesToRender;
    }
  }

  //uses the api to get the list of categories
  useEffect(() => {
    api
      .fetcher(categoryListAddress)
      .then((result) => {
        return result["meals"].map((category) => {
          return category["strCategory"];
        });
      })
      .then((output) => {
        setCategoryList(output);
        setActive(output[0]);
      });
  }, []);

  return (
    <div>
      <Search userSearch={userSearch} handleChange={handleChange} />
      <div className="categoriesContainer">
        <div className="row1Column1">
          <div className="buttonTabs">
            {categoryList.map((category, index) => {
              return (
                <Tab
                  key={index}
                  active={active === category}
                  setActive={setActive}
                  category={category}
                ></Tab>
              );
            })}
          </div>
        </div>
        <div className="row1Column2">
          <div className="recipesContainer">
            <RecipeList active={active} myRecipes={recipes} />
          </div>
        </div>
      </div>
    </div>
  );
}
