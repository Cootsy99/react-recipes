import { useEffect, useState } from "react";
import RecipeList from "./RecipeList";
import Search from "./Search";
import Tab from "./Tab";
import "./RecipesByCategory.css";

export default function RecipesByCategory({ api, myRecipes }) {
  //   const categories = ["Category 1", "Category 2", "Category 3"];
  const [categoryList, setCategoryList] = useState([]);
  const [active, setActive] = useState([]);
  const categoryListAddress = api.address + "/list.php?c=list";
  const [userSearch, setUserSearch] = useState("");
  const [recipesToRender, setRecipesToRender] = useState(undefined);
  const handleChange = (event) => setUserSearch(event.target.value);

  useEffect(() => {
    setRecipesToRender(myRecipes);
  }, [myRecipes]);

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
