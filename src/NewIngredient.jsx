import { useState } from "react";

export default function NewIngredient({ addToDo }) {
  const [newIngredient, setNewIngredient] = useState("");

  function handleAddToDo(event) {
    event.preventDefault();
    addToDo(newToDo);
    setNewIngredient("");
  }

  return (
    <>
      {/* <h2> New To-Do </h2> */}
      <form onSubmit={handleAddToDo}>
        <input
          value={newIngredient}
          onChange={(event) => setNewIngredient(event.target.value)}
          placeholder="Add a new ingredient"
          required
        />
        <button type="submit">Add New Ingredient</button>
      </form>
    </>
  );
}

function addToDo(todo) {
  setTodos([...todos, { text: todo, completed: false }]);
}
