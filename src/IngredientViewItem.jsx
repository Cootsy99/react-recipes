import { useEffect, useState } from "react";
import "./IngredientViewItem.css";

export default function IngredientViewItem(props) {
  //setup states
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(props.ingredient);
  const [completed, setCompleted] = useState(false);

  //handles click of edit ingredient button
  function handleClick() {
    setEditing(!editing);
    props.setIngredientsList(
      props.ingredientsList.map((ingredient, index) => {
        if (index === props.index) {
          return edited;
        } else {
          return ingredient;
        }
      })
    );
  }

  //updates the ingredient value if there has been an edit since last page render
  useEffect(() => setEdited(props.ingredient), [props.ingredient]);

  return (
    <li
      //update styling if it's been completed on the 'make recipe' component
      className="ingredientViewItem"
      style={
        completed
          ? {
              backgroundColor: "lightgreen",
            }
          : {}
      }
    >
      {/* Adds a checkbox when the recipe is in our recipe book */}
      {props.inMyRecipes && (
        <input
          className="checkbox"
          type="checkbox"
          onClick={(event) => props.handleCheckBoxClick(props.index, event)}
        />
      )}

      {/* If user is editing the ingredient, show an input box, otherwise is a span */}
      {editing ? (
        <input
          className="ingredientName"
          type="text"
          value={edited}
          onChange={(event) => setEdited(event.target.value)}
          required
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleClick(event);
            }
          }}
        />
      ) : (
        // Span changes style depending on whether we are in 'view recipe' or 'make recipe'
        <span
          className="ingredientName"
          style={
            props.makeRecipe
              ? {
                  maxWidth: "100%",
                  textDecoration: completed && "line-through",
                }
              : { maxWidth: "60%" }
          }
        >
          {edited}
        </span>
      )}

      {/* shows ingredient image if it exists */}
      {props.pic && (
        <img src={`https://${props.pic}`} className="ingredPic"></img>
      )}

      {/* edit button */}
      {props.inMyRecipes && (
        <button onClick={handleClick} className="edit">
          {editing ? "✅" : "✏️"}
        </button>
      )}

      {/* delete button */}
      {props.inMyRecipes && (
        <button
          onClick={() => props.removeIngredient(props.index)}
          className="delete"
        >
          ❌
        </button>
      )}

      {/* completed button if in 'make recpe' component */}
      {props.makeRecipe && (
        <button
          onClick={() => setCompleted(!completed)}
          className="made"
          style={{
            backgroundColor: "lightGreen",
            fontSize: "20px",
          }}
        >
          {!completed ? "✔️" : "↩️"}
        </button>
      )}
    </li>
  );
}
