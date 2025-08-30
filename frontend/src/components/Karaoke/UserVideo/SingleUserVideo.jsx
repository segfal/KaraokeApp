import React, { useEffect, useRef } from "react";
import "./UserVideo.css";

export const SingleUserVideo = ({ videoStream }) => {
  const video = useRef();

  useEffect(() => {
    if (videoStream && video.current) {
      console.log("Setting remote video stream for peer");
      video.current.srcObject = videoStream;
      video.current.onloadedmetadata = () => {
        video.current.play().catch(e => console.log("Video play error:", e));
      };
    }
  }, [videoStream]);

  return (
    <div className="mr-4 bg-lightGreen rounded p-2 mb-8">
      <video 
        className="w-[200px] h-[150px]" 
        ref={video} 
        autoPlay 
        muted={false}
        playsInline
      />
    </div>
  );
};
