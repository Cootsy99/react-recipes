import { useState } from "react";

export default function NewIngredient({ addIngredient }) {
  //setup state
  const [newIngredient, setNewIngredient] = useState("");

  //handles submit on add new ingredient form
  function handleAddIngredient(event) {
    event.preventDefault();
    addIngredient(newIngredient);
    setNewIngredient("");
  }

  return (
    <>
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
