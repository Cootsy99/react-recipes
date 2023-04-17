export default function Tab(props) {
  const tabStyling = props.active
    ? {
        cursor: "pointer",
        backgroundColor: "lightBlue",
        opacity: 0.6,
        border: 0,
        outline: 0,
        borderBottom: "2px solid black",
        opacity: "1",
        margin: "30px 0",
      }
    : {
        cursor: "pointer",
        backgroundColor: "lightBlue",
        opacity: 0.6,
        borderBottom: "none",
        border: 0,
        outline: 0,
        margin: "30px 0",
      };

  return (
    <button onClick={() => props.setActive(props.category)} style={tabStyling}>
      {props.category}
    </button>
  );
}
