import React from "react";
import { FaPlay } from 'react-icons/fa';
import '../styles/Results.scss';

const Artist = ({ index, id, getSong, artistPage, artistPic, artist }) => {
  return(
    <div className="col-sm-2 col-6" id="result-card" key={index}>
    <div className="card" id={id} onClick={getSong ? (e) => getSong(e) : null}>
        <a href={artistPage ? artistPage : null} target="_blank" rel="noreferrer">
        <div className="card-image">
            <img className="card-img-top" src={artistPic !== undefined ? artistPic :  "https://i.scdn.co/image/ab6761610000e5eb1020c22e0ce742eca7166e65"} alt={artist} />
            <span className="play-circle">
                <FaPlay />
            </span>
        </div>
        <div className="card-body">
            <p className="card-title">{artist}</p>
            <p className="card-text">
                Artist
            </p>

        </div>
        </a>
    </div>
</div>        
  )
}

export default Artist;