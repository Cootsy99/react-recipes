import "./Search.css";

export default function Search(props) {
  return (
    // userSearch={userSearch} handleChange={handleChange}

    <div>
      <input
        placeholder="Search for recipes"
        value={props.userSearch}
        onChange={props.handleChange}
      ></input>
    </div>
  );
}
