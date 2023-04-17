import RecipeList from "./RecipeList";
import Search from "./Search";
import { useEffect, useState } from "react";
import Tab from "./Tab";

export default function RecipesByCuisine({ api }) {
  //   let allCuisines;

  const cuisines = ["Cuisine 1", "Cuisine 2", "Cuisine 3"];
  const [active, setActive] = useState(cuisines[0]);

  const cuisineListAddress = api.address + "/list.php?a=list";

  async function retrieveCuisines() {
    // allCuisines = api.fetcher(cuisineListAddress);
    const allCuisines = await api.fetcher(cuisineListAddress);
    const allCuisineList = allCuisines["meals"].map((cuisine) => {
      return cuisine["strArea"];
    });
    return allCuisineList;
    // console.log(allCuisineList);
    // return cuisineList;
    // console.log(allCuisines);
  }
  //   let myData;
  async function myFunction() {
    let myData = await retrieveCuisines();
    return await myData;
  }

  //   useEffect(retrieveCuisines, []);
  //   let store = retrieveCuisines();
  //   console.log(allCuisines);

  //   console.log(allCuisines);
  //   console.log(api.cuisineList);
  //   retrieveCuisines();

  return (
    <div>
      <Search />
      <div>
        <div className="buttonTabs">
          {cuisines.map((cuisine, index) => {
            return (
              <Tab
                key={index}
                active={active === cuisine}
                setActive={setActive}
                // onClick={() => setActive(category)}
                category={cuisine}
              ></Tab>
            );
          })}
        </div>
        {/* Cusinine 1 | Cuisine 2 | */}
        {/* {myFunction()} */}
        <RecipeList />
      </div>
    </div>
  );
}
