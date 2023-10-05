import React, { useState } from "react";
import SearchForm from "./SearchForm";


const Search = () => {

const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [radioInput, setRadioInput] = useState('');


  return (
    <div className="container" id="search-page">
      <div className="search-row row">
        <SearchForm
        value={searchQuery}
        handleUserInput={(e) => setSearchQuery(e.target.value)}
        handleRadioInput={(e) => setRadioInput(e.target.value)}
        />
      </div>
      <div className="result-row row"></div>
    </div>
  );
};

export default Search;
