import React, { useState } from "react";
import SearchForm from "./SearchForm";
import axios from "axios";
import Artist from "./Artist";
import Album from "./Album";
import Song from "./Song";
import { BiSolidMusic } from "react-icons/bi";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [radioInput, setRadioInput] = useState("");
  const [error, setError] = useState("");

  const handleRadioInput = (e) => {
    setSearchResults([]);
    setRadioInput(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchQuery.trim() === "" && radioInput.trim() === "") {
      setError(
        "Please enter a value in the search field and select an option."
      );
      return;
    } else if (searchQuery.trim() === "") {
      setError("Please enter a value in the search field.");
      return;
    } else if (radioInput.trim() === "") {
      setError("Please select an option.");
      return;
    }

    setError("");

    try {
      const response = await axios.get(
        `https://spotify-app-rest.onrender.com/api/search?searchQuery=${searchQuery}&searchType=${radioInput}&limit=5`
      );

      if (radioInput === "artist") {
        setSearchResults(response.data.artists.items);
      }
      if (radioInput === "album") {
        setSearchResults(response.data.albums.items);
      }
      if (radioInput === "track") {
        setSearchResults(response.data.tracks.items);
      }
    } catch (error) {
      setError(
        `There was an error when performing the search: ${error.response.data.error.message}`
      );
    }
    setSearchQuery("");
  };

  const renderSearchResults = () => {
    if (searchResults.length === 0) {
      return;
    }

    if (radioInput === "artist") {
      return searchResults.map((result, index) => {
        return (
          <Artist
            key={index}
            index={index}
            id={result.id}
            artist={result.name}
            artistPic={result.images[0]?.url}
            artistPage={result.external_urls.spotify}
          />
        );
      });
    }

    if (radioInput === "album") {
      return searchResults.map((result) => {
        return <Album key={result.id} result={result} />;
      });
    }

    if (radioInput === "track") {
      return <Song tracks={searchResults} />;
    }

    throw new Error("radio value is not valid");
  };

  return (
    <div className="container" id="search-page">
      <div className="search-row row">
        <SearchForm
          value={searchQuery}
          handleUserInput={(e) => setSearchQuery(e.target.value)}
          handleRadioInput={handleRadioInput}
          handleSearch={handleSearch}
        />
        {error && <p className="alert alert-danger mt-3" style={{width:'475px'}}>{error}</p>}
      </div>
      <div className="result-row row">{renderSearchResults()}</div>
      {renderSearchResults() && <h4><center>Click on one of the results to play some tunes! <BiSolidMusic /></center></h4>}
    </div>
  );
};

export default Search;
