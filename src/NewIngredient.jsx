import { useState } from "react";

export default function NewIngredient({ addIngredient }) {
  const [newIngredient, setNewIngredient] = useState("");

  function handleAddIngredient(event) {
    event.preventDefault();
    addIngredient(newIngredient);
    setNewIngredient("");
  }

  return (
    <>
      {/* <h2> New To-Do </h2> */}
      <form onSubmit={handleAddIngredient}>
        <input
          value={newIngredient}
          onChange={(event) => setNewIngredient(event.target.value)}
          placeholder="Add a new ingredient"
          required
          style={{
            backgroundColor: "white",
            width: "20vw",
            borderRadius: 0,
            fontSize: "15px",
          }}
        />
        <button type="submit">Add New Ingredient</button>
      </form>
    </>
  );
}

// function addToDo(todo) {
//   setTodos([...todos, { text: todo, completed: false }]);
// }
