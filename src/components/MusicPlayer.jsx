import React, { useState, useRef, useEffect } from "react";
import "./styles.css";

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const [ProgressBarVal, setProgressBarVal] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(0);
  const tracks = [
    {
      title: "Song 1",
      url: "https://cdn.pixabay.com/audio/2023/03/16/audio_df7d9198c3.mp3"
    },
    {
      title: "Song 2",
      url: "https://cdn.pixabay.com/audio/2023/03/14/audio_676747013a.mp3"
    },
    {
      title: "Song 3",
      url: "https://cdn.pixabay.com/audio/2023/02/28/audio_550d815fa5.mp3"
    }
  ];

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playPreviousTrack = () => {
    setCurrentTrack((currentTrack - 1 + tracks.length) % tracks.length);
    setIsPlaying(false);
    audioRef.current.load();
  };

  const playNextTrack = () => {
    setCurrentTrack((currentTrack + 1) % tracks.length);
    setIsPlaying(false);
    audioRef.current.load();
  };
  useEffect(() => {
    if (isPlaying) {
      setInterval(() => {
        console.log(audioRef?.current?.currentTime && audioRef?.current?.duration, this.stat);
        if (audioRef?.current?.currentTime && audioRef?.current?.duration) {

          console.log(audioRef.current.currentTime / audioRef.current.duration);
          setProgressBarVal(audioRef.current.currentTime / audioRef.current.duration);
        }
      }, 1000);
    }
  
  }, [isPlaying]);



  return (
    <div className="music-controls">
      <audio
        ref={audioRef}
        src={tracks[currentTrack].url}
      />
      <button className="previous-button" onClick={playPreviousTrack}>
        Previous
      </button>
      <button className="play-button" onClick={togglePlay}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <button className="next-button" onClick={playNextTrack}>
        Next
      </button>
      <div className="progress-bar">
        <label htmlFor="Progress">Progress:</label>
        <input
          ref={progressBarRef}
          id="Progress"
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={ProgressBarVal}
          onChange={(e) => setProgressBarVal(prev => {
            audioRef.current.currentTime = e.target.value * audioRef.current.duration;
            return e.target.value;
          })
          }
        />
      </div>

      <div className="volume-control">
        <label htmlFor="volume">Volume:</label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.1"
          defaultValue="1"
          onChange={(e) => {
            audioRef.current.volume = e.target.value;
          }}
        />
      </div>
    </div>
  );
}

export default MusicPlayer;
