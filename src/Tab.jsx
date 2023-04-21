export default function Tab(props) {
  //Generating the relevant tab styling depending on if it is selected in the recipes by category/cuisine components
  const tabStyling = props.active
    ? {
        cursor: "pointer",
        backgroundColor: "lightBlue",
        border: 0,
        outline: 0,
        border: "2px solid #ea5455",
        opacity: "1",
        margin: "0",
        height: "3vw",
        width: "15vw",
      }
    : {
        cursor: "pointer",
        backgroundColor: "lightBlue",
        opacity: 0.4,
        border: 0,
        border: "1px solid black",
        borderBottom: "none",
        outline: 0,
        margin: "0",
        height: "3vw",
        width: "15vw",
      };

  return (
    <button onClick={() => props.setActive(props.category)} style={tabStyling}>
      <p style={{ margin: "auto", fontWeight: "bold" }}>{props.category}</p>
    </button>
  );
}
