import { useState } from "react";

export default function NewStep({ addStep }) {
  const [newStep, setNewStep] = useState("");

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
        />
        <button type="submit">Add New Step</button>
      </form>
    </>
  );
}
