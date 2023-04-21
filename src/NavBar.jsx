import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar(props) {
  //Returning Nav bar buttons, style changes depending on active tab
  return (
    <nav className="NavBar">
      <div className="NavContainer">
        <Link
          to="/"
          style={
            props.activeTab === "Home"
              ? { color: "#ea5455" }
              : { color: "white" }
          }
        >
          {" "}
          Home{" "}
        </Link>
        &nbsp; | &nbsp;
        <Link
          to="/AllRecipes"
          style={
            props.activeTab === "All"
              ? { color: "#ea5455" }
              : { color: "white" }
          }
        >
          {" "}
          All My Recipes{" "}
        </Link>
        &nbsp; | &nbsp;
        <Link
          to="/RecipesByCuisine"
          style={
            props.activeTab === "Cuisine"
              ? { color: "#ea5455" }
              : { color: "white" }
          }
        >
          {" "}
          My Recipes by Cuisine{" "}
        </Link>
        &nbsp; | &nbsp;
        <Link
          to="/RecipesByCategory"
          style={
            props.activeTab === "Category"
              ? { color: "#ea5455" }
              : { color: "white" }
          }
        >
          {" "}
          My Recipes by Category{" "}
        </Link>
        &nbsp; | &nbsp;
        <Link
          to="/AddNewRecipes"
          style={
            props.activeTab === "New"
              ? { color: "#ea5455" }
              : { color: "white" }
          }
        >
          {" "}
          Add New Recipes{" "}
        </Link>
      </div>
    </nav>
  );
}
