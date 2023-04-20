import RecipeList from "./RecipeList";
import Search from "./Search";
import { useEffect, useState } from "react";
import Tab from "./Tab";
import "./RecipesByCuisine.css";

export default function RecipesByCuisine({ api, myRecipes }) {
  const [cuisineList, setCuisineList] = useState([]);
  const [active, setActive] = useState([]);
  const cuisineListAddress = api.address + "/list.php?a=list";
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
      .fetcher(cuisineListAddress)
      .then((result) => {
        return result["meals"].map((cuisine) => {
          return cuisine["strArea"];
        });
      })
      .then((output) => {
        setCuisineList(output);
        setActive(output[0]);
      });
  }, []);

  return (
    <div>
      <Search userSearch={userSearch} handleChange={handleChange} />
      <div className="cuisinesContainer">
        <div className="row1Column1">
          <div className="buttonTabs">
            {cuisineList.map((cuisine, index) => {
              return (
                <Tab
                  key={index}
                  active={active === cuisine}
                  setActive={setActive}
                  category={cuisine}
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
