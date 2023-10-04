import React from "react";
import '../styles/RandomPage.scss';

const RandomPage = () => {
  return (
    <div className="container random-container">
      <div className="row random-header header">
        <h2>Generate a song from one of these artists.</h2>
      </div>
      <div className="favorites-row row"></div>
      <div className="random-song-row row"></div>
    </div>
  );
};

export default RandomPage;
