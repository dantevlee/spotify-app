import React, { useState } from "react";
import '../styles/RandomPage.scss';
import Artist from "./Artist";
import axios from "axios";
import { Artists } from "../Artists";
import Song from "./Song";
import { BiSolidMusic } from "react-icons/bi";

const RandomPage = () => {

  const [randomSong, setRandomSong] = useState([]);

  const renderArtists = () => {
    return Artists.map((artist, index) => (
      <Artist
        key={index}
        index={index}
        id={artist.id}
        artist={artist.name}
        artistPic={artist.imageSrc}
        getSong={() => getRandomSong(artist.id)}
      />
    ));
  };

  const getRandomSong = async (id) => {
    try {
      const response = await axios.get(`/api/random?id=${id}`);
      setRandomSong(response.data.tracks);
    } catch (err) {
      console.log(err);
      alert(`There was an error in the application: ${err.response.data.error.message}`);
    }
  };

  const renderRandomSong = () => {
    let RNG = Math.floor(Math.random() * randomSong.length);
    return randomSong.length > 0 ? <Song tracks={[randomSong[RNG]]} /> : null;
  };


  return (
    <div className="container random-container">
      <div className="row random-header header">
        <h2>Generate a song from one of these artists</h2>
      </div>
      <div className="favorites-row row">{renderArtists()}</div>
      <div className="random-song-row row">{renderRandomSong()}</div>
      {renderRandomSong() && <h4><center>Click result to play some tunes! <BiSolidMusic /></center></h4>}
    </div>
  );
};

export default RandomPage;
