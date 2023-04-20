import "./Search.css";

export default function Search(props) {
  return (
    // userSearch={userSearch} handleChange={handleChange}

    <div className="container">
      {/* <form
        onSubmit={
          props.handleSubmit
            ? props.handleSubmit
            : (event) => event.preventDefault()
        }
      > */}
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
      {/* </form> */}
    </div>
  );
}

// type="submit"
