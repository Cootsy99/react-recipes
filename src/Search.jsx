import "./Search.css";

export default function Search(props) {
  return (
    <div className="container">
      {/* Search bar */}
      <div className="inputContainer">
        <input
          placeholder="Search by recipe name"
          value={props.userSearch}
          onChange={props.handleChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              return props.handleSubmit(event);
            }
          }}
        ></input>
      </div>

      {/* Search button */}
      {props.wantSearchButton && (
        <div className="buttonContainer">
          <button
            className="searchButton"
            type="submit"
            onClick={(event) => props.handleSubmit(event)}
          >
            🔎
          </button>
        </div>
      )}
    </div>
  );
}
