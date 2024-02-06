import React, { useState } from "react";
import SearchForm from "./SearchForm";
import axios from "axios";
import Artist from "./Artist";
import Album from "./Album";
import Song from "./Song";
import { BiSolidMusic } from "react-icons/bi";
import { Alert } from "react-bootstrap";

const Search = ({visitCount, isInitialLoad}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [error, setError] = useState("");

  const handleSearchCriteria = (e) => {
    setSearchResults([]);
    setSearchCriteria(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
   
    if (visitCount === 1) {
      isInitialLoad = true
      visitCount = 0;
    }

    if (searchQuery.trim() === "" && searchCriteria.trim() === "") {
      setError(
        "Please enter a value in the search field and select a search criteria."
      );
      return;
    } else if (searchQuery.trim() === "") {
      setError("Please enter a value in the search field.");
      return;
    } else if (searchCriteria.trim() === "") {
      setError("Please select a search criteria.");
      return;
    }

    setError("");

    try {
      const response = await axios.get(
        `https://spotify-app-rest.onrender.com/api/search?searchQuery=${searchQuery}&searchType=${searchCriteria}&limit=5`
      );

      if (searchCriteria === "artist") {
        setSearchResults(response.data.artists.items);
        isInitialLoad = false;
      }
      if (searchCriteria === "album") {
        setSearchResults(response.data.albums.items);
        isInitialLoad = false;
      }
      if (searchCriteria === "track") {
        setSearchResults(response.data.tracks.items);
        isInitialLoad = false;
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

    if (searchCriteria === "artist") {
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

    if (searchCriteria === "album") {
      return searchResults.map((result) => {
        return <Album key={result.id} result={result} />;
      });
    }

    if (searchCriteria === "track") {
      return <Song tracks={searchResults} />;
    }

    throw new Error("radio value is not valid");
  };

  const removeNotification = () => {
    isInitialLoad = false;
    visitCount = 0;
  };

  return (
    <div className="container" id="search-page">
      {isInitialLoad && (
        <Alert variant="info" onClose={() => removeNotification()} dismissible>
          This server is running on a free instance in the cloud that spins down
          if unused. It may take a few seconds for the first app initialization.
          Thank you for your patience!
        </Alert>
      )}
      <div className="search-row row">
        <SearchForm
          value={searchQuery}
          handleUserInput={(e) => setSearchQuery(e.target.value)}
          handleSearchCriteria={handleSearchCriteria}
          handleSearch={handleSearch}
        />
        {error && (
          <p className="alert alert-danger mt-3" style={{ width: "475px" }}>
            {error}
          </p>
        )}
      </div>
      <div className="result-row row">{renderSearchResults()}</div>
      {renderSearchResults() && (
        <h4>
          <center>
            Click on one of the results to play some tunes! <BiSolidMusic />
          </center>
        </h4>
      )}
    </div>
  );
};

export default Search;
