// A component that intents to display the video fetched from the youtube API
import React from "react";

const Video = () => {
  return (
    <div>
      <h2>Video</h2>
      {/* test  */}
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/HyWYpM_S-2c"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default Video;
