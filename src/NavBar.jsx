import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar(props) {
  return (
    <nav className="NavBar">
      <div className="NavContainer">
        <Link
          to="/"
          // onClick={() => {
          //   props.setActiveTab("Home");
          // }}
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
          // onClick={() => {
          //   props.setActiveTab("All My Recipes");
          // }}
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
          // onClick={() => {
          //   props.setActiveTab("My Recipes By Cuisine");
          // }}
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
          // onClick={() => {
          //   props.setActiveTab("My Recipes By Category");
          // }}
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
          // onClick={() => {
          //   props.setActiveTab("Add New Recipes");
          // }}
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
