import "./MethodViewItem.css";
import { useEffect, useState } from "react";

export default function MethodViewItem(props) {
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(props.step);

  function handleClick(event) {
    setEditing(!editing);
    // todo.completed ? removeFromList(todo) : markAsComplete(todo);
  }

  useEffect(() => setEdited(props.step), [props.step]);

  return (
    <li className="stepViewItem" style={{ backgroundColor: "hotpink" }}>
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
        <span className="stepName">{edited}</span>
      )}
      <button onClick={handleClick} className="edit">
        {"✏️"}
      </button>
      <button onClick={() => props.removeStep(props.index)} className="delete">
        ❌
      </button>
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
