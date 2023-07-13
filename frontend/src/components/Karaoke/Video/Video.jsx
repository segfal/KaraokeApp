// A component that intents to display the video fetched from the youtube API
import React from "react";
import { useSelector } from "react-redux";

const Video = () => {
  const video = useSelector((state) => state.video.video);
  console.log(video);
  return (
    <div>
      <h2>Video</h2>
      {/* test  */}
      <iframe
        width="560"
        height="315"
        src={video} //"https://www.youtube.com/embed/HyWYpM_S-2c"
        rel="noreferrer"
        title={video}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;
