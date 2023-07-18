import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import { SocketContext } from "../../../context";
import { syncVideoThunk } from "../../../redux/Video/Video.action";

// import io from 'socket.io-client';

// const socket = io('http://localhost:4000');

const Video = () => {
  const video = useSelector((state) => state.video.video);
  
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  // console.log("Socket in video component", socket)
  
  const roomId = socket.id;
  console.log("VIDEO STATE: ", video);
  const [playing, setPlaying] = useState(true);
  const [ended, setEnded] = useState(true);

  useEffect(()=> {
    dispatch(syncVideoThunk(socket));
  }, [])
  
  const pauseVideo = () => {
    console.log("pause");
    console.log("PAUSE: ",{roomId});
    socket.emit("on_pause", {roomId});
  };

  const pauseAll = () => {
    setPlaying(false);
  };

  const resumeVideo = () => {
    console.log("resume");
    console.log("RESUME: ", {roomId});
    socket.emit("on_resume", {roomId});
  };

  const resumeAll = () => {
    setPlaying(true);
  };

  const endVideo = () => { // hasEnded
    console.log("end");
    socket.emit("is_ended", {roomId});
  };

  // Setting the next video
  const handleEnd = () => {
    setEnded(true);
    if (ended) {
      
      setVideo(allVideos[0]);
    }

  };

  // Pause useEffect
  useEffect(() => {
    console.log("USE EFFECT IS RUNNING")
    socket.on("pause", () => {
      console.log("Listening for pause")
      pauseAll();
    });
    return () => {
      socket.off("pause");
    };
  }, []);
  // Resume useEffect
  useEffect(() => {
    console.log("USE EFFECT IS RUNNING")
    socket.on("resume", () => {
      resumeAll();
    });
    return () => {
      socket.off("resume");
    };
  }, []);
  // Ended useEffect
  useEffect(() => {
    console.log("USE EFFECT IS RUNNING")
    socket.on("end", () => {
      handleEnd();
    });
    return () => {
      socket.off("end");
    };
  }, []);


  // useEffect(()=> {
  //   console.log("DISPATCHING SYNCVIDEOTHUNK")
  //   dispatch(syncVideoThunk());
  // }, )
  //if length of video is 0, then display a message saying that the video is not available
  if (video.length === 0) {
    return <div><h1>Add a video</h1></div>;
  } 
  return (
    <div className="video-responsive">
      <ReactPlayer
        url={video}
        playing={playing}
        controls={true}
        width="853px"
        height="480px"
        onPause={() => console.log("paused")}
        onPlay={() => console.log("playing")}
        onEnded={() => {
          console.log("ended");
          endVideo();
        }}
        autoPlay={false}
      />
      {/*console.log("VIDEO: ", video)*/}
      <div>
        {playing ? (
          <button onClick={pauseVideo}>Pause</button>
        ) : (
          <button onClick={resumeVideo}>Resume</button>
        )}
        <button>Sync</button>
      </div>
    </div>
  );
};

Video.propTypes = {
  link: PropTypes.string.isRequired,
};

export default Video;