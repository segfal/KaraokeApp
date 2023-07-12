import React from 'react';
import "./search.css";

// Anytime you do a search it adds to a queue
const Search = () => {
  return (
    <div class="col-md-8">
      <div class="d-flex form-inputs">
        <input class="form-control" onChange={handleInput()} type="text" placeholder="Search for music..."/>
        <button class="btn-search" onClick={handleSearch()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </div>
    </div>
  )

}

export default Search;