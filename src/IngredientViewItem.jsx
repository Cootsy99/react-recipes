import "./IngredientViewItem.css";

export default function IngredientViewItem(props) {
  function handleClick(event) {
    console.log("clicked");
    // todo.completed ? removeFromList(todo) : markAsComplete(todo);
  }

  return (
    <li className="ingredientViewItem" style={{ backgroundColor: "hotpink" }}>
      <span className="ingredientName">{props.ingredient}</span>
      <button onClick={handleClick} className="edit">
        {"✏️"}
      </button>
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
