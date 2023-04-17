import RecipeList from "./RecipeList";
import Search from "./Search";
import { useEffect, useState } from "react";
import Tab from "./Tab";

export default function RecipesByCuisine({ api }) {
  //   let allCuisines;

  //   const cuisines = ["Cuisine 1", "Cuisine 2", "Cuisine 3"];
  const [cuisineList, setCuisineList] = useState([]);
  const [active, setActive] = useState([]);

  const cuisineListAddress = api.address + "/list.php?a=list";

  //   async function retrieveCuisines() {
  //     // allCuisines = api.fetcher(cuisineListAddress);
  //     const allCuisines = await api.fetcher(cuisineListAddress);
  //     const allCuisineList = allCuisines["meals"].map((cuisine) => {
  //       return cuisine["strArea"];
  //     });
  //     setCuisineList(allCuisineList);
  //     // setActive(cuisineList[0]);
  //   }

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
          {cuisineList.map((cuisine, index) => {
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
