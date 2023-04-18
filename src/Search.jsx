import "./Search.css";

export default function Search(props) {
  return (
    // userSearch={userSearch} handleChange={handleChange}

    <div className="container">
      <form
        onSubmit={
          props.handleSubmit
            ? props.handleSubmit
            : (event) => event.preventDefault()
        }
      >
        <input
          placeholder="Search for recipes"
          value={props.userSearch}
          onChange={props.handleChange}
        ></input>
        {props.wantSearchButton && (
          <button className="searchButton" type="submit">
            🔎
          </button>
        )}
      </form>
    </div>
  );
}
