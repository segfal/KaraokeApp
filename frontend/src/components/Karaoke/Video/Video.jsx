import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import { SocketContext } from "../../../context";
// import { syncVideoThunk } from "../../../redux/Video/Video.action";
import { syncVideo } from "../../../redux/Video/Video.action";
import { removeVideoThunk } from "../../../redux/Video/Video.action";



const Video = () => {
  const video = useSelector((state) => state.video.video);
  const allVideos = useSelector((state) => state.video.allVideos);
  const uniqueVideos = useSelector((state) => state.video.uniqueVideos);
  
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  
  //console.log("First vid link: ", uniqueVideos[0])
  //console.log("All Videos ", uniqueVideos);
  
  const [link, setLink] = useState(uniqueVideos[0] ? uniqueVideos[0] : "hello");
  const roomId = socket.id;
  const [playing, setPlaying] = useState(true);
  const [ended, setEnded] = useState(true);

  useEffect(()=> {
    socket.on('sync_video', (link) => {
      console.log("FIRING SYNC_VIDEO IN USEEFFECT")
      dispatch(syncVideo(link))
  })
    // dispatch(syncVideo);
    return () => socket.off('sync_video');
  }, [])
  
  const pauseVideo = () => {
    socket.emit("on_pause", {roomId});
  };

  const pauseAll = () => {
    setPlaying(false);
  };

  const resumeVideo = () => {
    //console.log("resume");
    //console.log("RESUME: ", {roomId});
    socket.emit("on_resume", {roomId});
  };

  const resumeAll = () => {
    setPlaying(true);
  };

  const endVideo = () => { // hasEnded
    //console.log("end");
    socket.emit("is_ended", {roomId});
  };

  // Setting the next video
  const handleEnd = () => {
      setLink(uniqueVideos[0]);
  };

  // Pause useEffect
  useEffect(() => {
    //console.log("USE EFFECT IS RUNNING")
    socket.on("pause", () => {
      pauseAll();
    });
    return () => {
      socket.off("pause");
    };  
  }, []);

  // Resume useEffect
  useEffect(() => {
    
    socket.on("resume", () => {
      resumeAll();
    });
    return () => {
      socket.off("resume");
    };
  }, []);




  
  // Ended useEffect
  useEffect(() => {
   
    
    //console.log("HANDLE END: ", uniqueVideos)
    //uniqueVideos.shift();
    setLink(uniqueVideos[0] ? uniqueVideos[0] : undefined);///
    
    
    
    socket.on("end", () => {
    
      //uniqueVideos.shift();
      //get rid of all instances of x in allVideos array
      dispatch(removeVideoThunk(uniqueVideos[0],socket.id));
      //console.log("ALL VIDEOS: ", allVideos);

      
      handleEnd();
      

     
      
    });
    return () => {
      socket.off("end");
    };
  }, [allVideos.length,uniqueVideos.length]);



  if (!(video)  || link === undefined) {
    return (
      <div className="relative mt-4" style={{ paddingTop: "56.25%" }}>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black rounded-md">
          <h1 className="font-extra-bold uppercase text-white text-2xl animate-pulse">Add a song</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="video-responsive relative mt-4" style={{ paddingTop: "56.25%" }}>
      <div className="absolute top-0 left-0 w-full h-full bg-black flex flex-col items-center justify-center rounded-md">
        <ReactPlayer
          url={link}
          playing={playing}
          controls={true}
          onPause={() => console.log("paused")}
          onPlay={() => console.log("playing")}
          onEnded={() => {
            handleEnd();
            endVideo();
          }}
          autoPlay={false}
          width="100%"
          height="100%"
        />
        <div className="mt-4">
          {playing ? (
            <button onClick={pauseVideo} className="text-white font-extra-bold bg-red-600 rounded-md px-4 py-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clip-rule="evenodd" />
              </svg>
            </button>
          ) : (
            <button onClick={resumeVideo} className="text-white font-extra-bold bg-green-600 rounded-md px-4 py-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Video.propTypes = {
  link: PropTypes.string.isRequired,
};

export default Video;