import { useEffect, useState } from "react";
import RecipeList from "./RecipeList";
import Search from "./Search";
import Tab from "./Tab";

export default function RecipesByCategory({ api }) {
  //   const categories = ["Category 1", "Category 2", "Category 3"];
  const [categoryList, setCategoryList] = useState([]);
  const [active, setActive] = useState([]);
  const categoryListAddress = api.address + "/list.php?c=list";

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
      <Search />
      <div>
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
        <RecipeList />
      </div>
    </div>
  );
}
