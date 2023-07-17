import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

const Video = ({ link, room, socket }) => {
  const [playing, setPlaying] = useState(true);
  const test = "test";
  const pauseVideo = () => {
    console.log("pause");
    socket.emit("on_pause", {room});
  };

  const pauseAll = () => {
    setPlaying(false);
  };
  const resumeVideo = () => {
    console.log("resume");
    socket.emit("on_resume", {room});
  };

  const resumeAll = () => {
    setPlaying(true);
  };
  useEffect(() => {
    socket.on("pause", () => {
      pauseAll();
    });
    return () => {
      socket.off("pause");
    };
  }, []);

  useEffect(() => {
    socket.on("resume", () => {
      resumeAll();
    });
    return () => {
      socket.off("resume");
    };
  }, []);

  return (
    <div className="video-responsive">
      <ReactPlayer
        url={link}
        playing={playing}
        controls={true}
        width="853px"
        height="480px"
        onPause={() => console.log("paused")}
        onPlay={() => console.log("playing")}
        onEnded={() => {
          "Hello World";
        }}
        autoplay={false}
      />

      <button size="small">
        {playing ? (
          <button onClick={pauseVideo}>Pause</button>
        ) : (
          <button onClick={resumeVideo}>Resume</button>
        )}
      </button>
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
