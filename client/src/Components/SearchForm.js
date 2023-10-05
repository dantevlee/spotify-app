import React from "react";
import "../styles/SearchForm.scss";

const SearchForm = ({
  handleSearch,
  handleRadioInput,
  handleUserInput,
  value,
}) => {
  return (
    <form className="container" id="search-form" onSubmit={handleSearch}>
      <div className="row">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="What do you want to listen to?"
            onChange={handleUserInput}
            value={value}
          />

          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit">
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="row" id="radio-buttons">
        <div className="form-check ">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="artistRadio"
            value="artist"
            onChange={handleRadioInput}
          />
          <label className="form-check-label" htmlFor="artistRadio">
            Artists
          </label>
        </div>

        <div className="form-check ">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="songRadio"
            value="track"
            onChange={handleRadioInput}
          />
          <label className="form-check-label" htmlFor="songRadio">
            Songs
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="albumRadio"
            value="album"
            onChange={handleRadioInput}
          />
          <label className="form-check-label" htmlFor="albumRadio">
            Albums
          </label>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
