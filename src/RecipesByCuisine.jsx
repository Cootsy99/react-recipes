import RecipeList from "./RecipeList";
import Search from "./Search";
import { useEffect, useState } from "react";
import Tab from "./Tab";

export default function RecipesByCuisine({ api }) {
  const [cuisineList, setCuisineList] = useState([]);
  const [active, setActive] = useState([]);

  const cuisineListAddress = api.address + "/list.php?a=list";

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
      <Search />
      <div>
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
        <RecipeList />
      </div>
    </div>
  );
}
