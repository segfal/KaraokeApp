import React, { useEffect, useRef } from 'react';
import './UserVideo.css'

export const SingleUserVideo = ({ videoStream }) => {
  const video = useRef();
  

  useEffect(() => {
    const setVideoStream = () => {
        
      if (videoStream) {
        video.current.srcObject = videoStream;
      }
    };
    console.log("video", video)
    setVideoStream();
  
    return () => {
      // Clean up resources when the component unmounts
    //   if (video.current.srcObject) {
    //     video.current.srcObject.getTracks().forEach(track => track.stop());
    //   }
    };
  }, [videoStream]);
  

  return (
    <div id="user-vid">
      {/* <div>SingleVid</div> */}
      {video?( <video className="user-vid" ref={video} autoPlay muted={true} />) :(<h2>...Loading</h2>)}
     
    </div>
  );
};