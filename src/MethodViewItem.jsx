import "./MethodViewItem.css";
import { useEffect, useState } from "react";

export default function MethodViewItem(props) {
  //setup states
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(props.step);
  const [completed, setCompleted] = useState(false);

  //handles click of edit step button
  function handleClick() {
    setEditing(!editing);
    props.setMethodList(
      props.methodList.map((step, index) => {
        if (index === props.index) {
          return edited;
        } else {
          return step;
        }
      })
    );
  }

  //updates the step value if there has been an edit since last page render
  useEffect(() => setEdited(props.step), [props.step]);

  return (
    <li
      //update styling if it's been completed on the 'make recipe' component
      className="stepViewItem"
      style={
        completed
          ? {
              backgroundColor: "lightgreen",
              border: "solid red 3px",
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

      {/* If user is editing the step, show an input box, otherwise is a span */}
      {editing ? (
        <input
          className="stepName"
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
          className="stepName"
          style={
            props.makeRecipe
              ? {
                  maxWidth: "100%",
                  textDecoration: completed && "line-through",
                }
              : props.inMyRecipes
              ? { maxWidth: "70%" }
              : { width: "100%" }
          }
        >
          {edited}
        </span>
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
          onClick={() => props.removeStep(props.index)}
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
