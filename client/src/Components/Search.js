import React from "react";
import SearchForm from "./SearchForm";


const Search = () => {
  return (
    <div className="container" id="search-page">
      <div className="search-row row">
        <SearchForm
        />
      </div>
      <div className="result-row row"></div>
    </div>
  );
};

export default Search;
