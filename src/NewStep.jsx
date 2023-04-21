import { useState } from "react";

export default function NewStep({ addStep }) {
  //setup state
  const [newStep, setNewStep] = useState("");

  //handles submit on add new step form
  function handleAddStep(event) {
    event.preventDefault();
    addStep(newStep);
    setNewStep("");
  }

  return (
    <>
      <form onSubmit={handleAddStep}>
        <input
          value={newStep}
          onChange={(event) => setNewStep(event.target.value)}
          placeholder="Add a new step"
          required
          style={{
            backgroundColor: "white",
            width: "20vw",
            borderRadius: 0,
            fontSize: "15px",
          }}
        />
        <button type="submit">Add New Step</button>
      </form>
    </>
  );
}
