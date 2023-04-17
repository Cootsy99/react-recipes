import { useState } from "react";
import RecipeList from "./RecipeList";
import Search from "./Search";
import Tab from "./Tab";

export default function RecipesByCategory() {
  const categories = ["Category 1", "Category 2", "Category 3"];
  const [active, setActive] = useState(categories[0]);
  return (
    <div>
      <Search />

      <div>
        <div className="buttonTabs">
          {categories.map((category, index) => {
            return (
              <Tab
                key={index}
                active={active === category}
                setActive={setActive}
                // onClick={() => setActive(category)}
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
