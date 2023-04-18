import "./MethodViewItem.css";

export default function MethodViewItem(props) {
  function handleClick(event) {
    console.log("clicked");
    // todo.completed ? removeFromList(todo) : markAsComplete(todo);
  }

  return (
    <li className="stepViewItem" style={{ backgroundColor: "hotpink" }}>
      <span className="stepName">{props.step}</span>
      <button onClick={handleClick} className="edit">
        {"✏️"}
      </button>
    </li>
  );
}
