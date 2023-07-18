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
  // const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  // console.log("Socket in video component", socket)
  
  const roomId = socket.id;
  console.log(video);
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

  const endVideo = () => {
    setEnded(true);
  };


  const hasEnded = () => {
    console.log("end");
    socket.emit("is_ended", {roomId});
  };


  const resumeAll = () => {
    setPlaying(true);
  };

    


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

  useEffect(() => {
    console.log("USE EFFECT IS RUNNING")
    socket.on("resume", () => {
      resumeAll();
    });
    return () => {
      socket.off("resume");
    };
  }, []);

  useEffect(() => {
    console.log("USE EFFECT IS RUNNING")
    socket.on("end", () => {
      endVideo();
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
          hasEnded();
        }}
        autoPlay={false}
      />
      {console.log("VIDEO: ", video)}
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


// A component that intents to display the video fetched from the youtube API
// import React from "react";
// import { useSelector } from "react-redux";

// const Video = () => {
//   /*Instead of displaying the stuff from the getVideoThunk, a getAllVideosThunk should be used instead to retrieve all videos and display 
//   them through a thunk. The iframe should be handled within the queue.

//   * The getAllVideosThunk would be handled in the Room component
//   */
//   const video = useSelector((state) => state.video.video);
//   console.log(video);
//   return (
//     <div>
//       <h2>Video</h2>
//       {/* test  */}
//       <iframe
//         width="560"
//         height="315"
//         src={video} //"https://www.youtube.com/embed/HyWYpM_S-2c"
//         rel="noreferrer"
//         title={video}
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         allowFullScreen
//       ></iframe>

//     </div>
//   );
// };

// export default Video;
