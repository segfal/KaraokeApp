import React, { useEffect, useRef } from "react";
import "./UserVideo.css";

export const SingleUserVideo = ({ videoStream }) => {
  const video = useRef();

  useEffect(() => {
    const setVideoStream = () => {
      // if (videoStream) {
      //           video.current.srcObject = videoStream;
      //           video.current.onloadedmetadata = () => {
      //             video.current.play(); // Play the video once it's loaded
      //           }
      //         };
      if (videoStream) {
        video.current.srcObject = videoStream;
        // video.current.onloadedmetadata = () => {
        //   video.current.play(); // Play the video once it's loaded
        // };
      }
    };
    // console.log("video", video);
    setVideoStream();

    // return () => {
    // Clean up resources when the component unmounts
    // if (video.current.srcObject) {
    //   video.current.srcObject.getTracks().forEach(track => track.stop());
    // }
    // };
  }, [videoStream]);

  return (
    <div className="mr-4 bg-lightGreen rounded p-2 mb-8">
      {/* <div>SingleVid</div> */}
      {/* {video ? (
        <video className="user-vid" ref={video} autoPlay muted={false} />
      ) : (
        <h2>...Loading</h2>
      )} */}
      <video className="w-[200px] h-[150px]" ref={video} autoPlay muted={false} />
    </div>
    
  );
};

