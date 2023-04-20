import { useEffect, useState } from "react";
import "./IngredientViewItem.css";

export default function IngredientViewItem(props) {
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(props.ingredient);
  const [completed, setCompleted] = useState(false);

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
    // console.log(props.index);
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
    <li
      className="ingredientViewItem"
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
      {props.pic && (
        <img src={`https://${props.pic}`} className="ingredPic"></img>
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
