import React, { useState } from "react";
import "./style.css";

function SearchForm({ searchFor }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    searchFor(searchTerm);
    setSearchTerm(searchTerm);
  }

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div>
      <form className="" onSubmit={handleSubmit}>
        <input 
          className="form-control"
          name="searchTerm"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={handleChange}
        />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SearchForm;