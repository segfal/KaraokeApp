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
    <div id="user-vid">
      {/* <div>SingleVid</div> */}
      {/* {video ? (
        <video className="user-vid" ref={video} autoPlay muted={false} />
      ) : (
        <h2>...Loading</h2>
      )} */}
      <video className="user-vid" ref={video} autoPlay muted={false} />
    </div>
    
  );
};

// import React, { useEffect, useRef } from 'react';

// export const SingleUserVideo = ({ videoStream }) => {
//   const video = useRef();

//   useEffect(() => {
//     const setVideoStream = () => {
//       if (videoStream) {
//         video.current.srcObject = videoStream;
//         video.current.onloadedmetadata = () => {
//           video.current.play(); // Play the video once it's loaded
//         };
//       }
//     };

//     // Call the function immediately to set the video stream (if available)
//     setVideoStream();

//     return () => {
//       // Clean up resources when the component unmounts
//       if (video.current.srcObject) {
//         video.current.srcObject.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, [videoStream]);

//   return (
//     <div>
//       <video ref={video} autoPlay muted={true} />
//     </div>
//   );
// };
