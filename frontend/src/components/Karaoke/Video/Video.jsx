// A component that intents to display the video fetched from the youtube API
import React from "react";
import { useSelector } from "react-redux";

const Video = () => {
  /*Instead of displaying the stuff from the getVideoThunk, a getAllVideosThunk should be used instead to retrieve all videos and display 
  them through a thunk. The iframe should be handled within the queue.

  * The getAllVideosThunk would be handled in the Room component
  */
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
      {/* <object width="420" height="315" data={video}/> */}

    </div>
  );
};

export default Video;
