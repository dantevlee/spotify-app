import React, { useState } from "react";
import '../styles/RandomPage.scss';
import Artist from "./Artist";
import axios from "axios";
import { Artists } from "../Artists";
import Song from "./Song";
import { BiSolidMusic } from "react-icons/bi";
import {Alert}  from 'react-bootstrap';

const RandomPage = () => {
  const [randomSong, setRandomSong] = useState([]);
  const [visitCount, setVisitCount] = useState(1)
  const [isInitialLoad, setIsInitialLoad] = useState(false);

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
    if (visitCount === 1){
      setIsInitialLoad(true)
    }
    try {
      const response = await axios.get(`http://localhost:3001/api/random?id=${id}`);
      setRandomSong(response.data.tracks);
      setIsInitialLoad(false)
    } catch (err) {
      console.log(err);
      alert(`There was an error in the application: ${err.response.data.error.message}`);
    }
    if(visitCount > 0){
      setVisitCount(0)
    }
  };

  const renderRandomSong = () => {
    let RNG = Math.floor(Math.random() * randomSong.length);
    return randomSong.length > 0 ? <Song tracks={[randomSong[RNG]]} /> : null;
  };

  const removeNotification = () => {
    setIsInitialLoad(false);
    setVisitCount(0)
  }


  return (
    <div className="container random-container">
          {isInitialLoad && (
        <Alert variant="info" onClose={() => removeNotification()} dismissible>
          This server is running on a free instance in the cloud that spins down if unused. It may take a few seconds for the first app initialization. Thank you for your patience!
        </Alert>
      )}
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
