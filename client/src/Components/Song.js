import React from 'react';
import { HiOutlineClock } from 'react-icons/hi';
import '../styles/Results.scss';


const Song = ({tracks}) => {

    function getMinutesAndSeconds(milliseconds){
        let minutes = Math.floor(milliseconds/60000);
        let seconds = Math.floor((milliseconds % 60000)/1000);

        if(seconds < 10){
            seconds = "0" + seconds;
        }

        return minutes + ':' + seconds;
    }

    return(
        <div className="table-container songs-container">
            <div className="row table-header">
                <div className="col-sm-1">
                    <p>#</p>
                </div>
                <div className="col-sm-6">
                    TITLE
                </div>
                <div className="col-sm-4"> 
                    ALBUM
                </div>
                <div className="col-sm-1">
                    <HiOutlineClock />
                </div>
            </div>
            {Array.isArray(tracks) ? tracks.map((track, index) => {
                    return(
                        <div className="row table-row" key={index}>
                        <a className="link-wrapper" href={track.external_urls.spotify} target="_blank" rel="noreferrer">
                        <div className="col-sm-1 cell index-cell">
                            {index + 1}
                        </div>
                        <div className="col-sm-6 cell title-cell">
                            <img src={track.album.images[1].url} alt={track.album.name} />
                            <div>
                                <span className="title-span">{track.name}</span>
                                <span className="artist-span">{track.artists[0].name}</span>
                            </div>
                        </div>
                        <div className="col-sm-4 cell album-cell">
                            <span>{track.album.name}</span>
                        </div>
                        <div className="col-sm-1 cell duration-cell">
                            {getMinutesAndSeconds(track.duration_ms)}
                        </div>
                        </a>
                    </div>
                    )
                }) : null}

        </div>

    )
}

export default Song;
