import React from "react";
import "../styles/Results.scss";
import { FaPlay } from "react-icons/fa";

const Album = ({ result }) => {
  return (
    <div className="col-sm-2 col-6" id="result-card">
      <a href={result.external_urls.spotify} target="_blank" rel="noreferrer">
        <div className="card">
          <div className="card-image">
            <img
              className="card-img-top album-art"
              src={
                result.images[1]?.url !== undefined
                  ? result.images[1]?.url
                  : "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2/image-size/original?v=mpbl-1&px=-1"
              }
              alt="Card cap"
            />
            <span className="play-circle">
              <FaPlay />
            </span>
          </div>
          <div className="card-body">
            <p className="card-title album-title">{result.name}</p>
            <p className="card-text">
              <span className="album-year">
                {result.release_date.substr(0, 4)}{" "}
              </span>
              <span>&bull;</span>
              <span className="album-artist"> {result.artists[0].name}</span>
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Album;
