import { useEffect, useState } from "react";
import "./IngredientViewItem.css";

export default function IngredientViewItem(props) {
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(props.ingredient);

  // console.log(props.ingredientsList);
  // const [checkedIngredients, setCheckedIngredients] = useState([
  //   "initial value",
  // ]);

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
    console.log(props.index);
    // todo.completed ? removeFromList(todo) : markAsComplete(todo);
  }

  // function handleCheckBoxClick(index) {
  //   setCheckedIngredients([...checkedIngredients, "added"]);
  //   console.log(checkedIngredients);
  // }

  useEffect(() => {
    setEdited(props.ingredient);
  }, [props.ingredient]);

  return (
    <li className="ingredientViewItem" style={{ backgroundColor: "hotpink" }}>
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
        <span className="ingredientName">{edited}</span>
      )}
      {props.inMyRecipes && (
        <button onClick={handleClick} className="edit">
          {editing ? "✅" : "✏️"}
        </button>
      )}
      {props.inMyRecipes && (
        <button
          onClick={() => props.removeIngredient(props.index)}
          className="delete"
        >
          ❌
        </button>
      )}
    </li>
  );
}

// export default function ToDoListItem({
//     todo,
//     index,
//     markAsComplete,
//     removeFromList
//   }) {
//     function handleClick(event) {
//       todo.completed ? removeFromList(todo) : markAsComplete(todo);
//     }

//     const completeStyle = {
//       backgroundColor: "darkgreen",
//       border: "solid red 5px"
//     };

//     return (
//       <li
//         className="ToDoListItem"
//         style={
//           todo.completed
//             ? completeStyle
//             : index % 2
//             ? { backgroundColor: "lavender" }
//             : { backgroundColor: "hotpink" }
//         }
//       >
//         <div className="flex-ctr-ctr">{index + 1}</div>
//         <span style={{ textDecoration: todo.completed && "line-through" }}>
//           {todo.text}{" "}
//         </span>
//         <button onClick={handleClick} className="complete">
//           {todo.completed ? "❌" : "✔️"}
//         </button>
//       </li>
//     );
//   }
