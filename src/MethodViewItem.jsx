import "./MethodViewItem.css";
import { useEffect, useState } from "react";

export default function MethodViewItem(props) {
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(props.step);
  const [completed, setCompleted] = useState(false);

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

  useEffect(() => setEdited(props.step), [props.step]);

  return (
    <li
      className="stepViewItem"
      style={
        completed
          ? {
              backgroundColor: "darkgreen",
              border: "solid red 3px",
            }
          : {}
      }
    >
      {props.inMyRecipes && (
        <input
          className="checkbox"
          type="checkbox"
          // checked="false"
          onClick={(event) => props.handleCheckBoxClick(props.index, event)}
        />
      )}
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
        <span
          className="stepName"
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
      {props.inMyRecipes && (
        <button onClick={handleClick} className="edit">
          {editing ? "✅" : "✏️"}
        </button>
      )}
      {props.inMyRecipes && (
        <button
          onClick={() => props.removeStep(props.index)}
          className="delete"
        >
          ❌
        </button>
      )}
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

//   return (
//     <li className="stepViewItem" style={{ backgroundColor: "hotpink" }}>
//       <span className="stepName">{props.step}</span>
//       <button onClick={handleClick} className="edit">
//         {"✏️"}
//       </button>
//     </li>
//   );
// }
