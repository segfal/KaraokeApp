import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import { SocketContext } from "../../../context";
// import { syncVideoThunk } from "../../../redux/Video/Video.action";
import { syncVideo } from "../../../redux/Video/Video.action";



const Video = () => {
  const video = useSelector((state) => state.video.video);
  const allVideos = useSelector((state) => state.video.allVideos);
  const set= new Set(allVideos);
  const uniqueVideos = Array.from(set);

  
  
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  
  console.log("First vid link: ", uniqueVideos[0])
  console.log("All Videos ", uniqueVideos);
  const tempurl = "https://www.youtube.com/embed/QC8iQqtG0hg";
  const [link, setLink] = useState(uniqueVideos[0]);
  
  const roomId = socket.id;
  
  const [playing, setPlaying] = useState(true);
  const [ended, setEnded] = useState(true);

  



  useEffect(()=> {
    socket.on('sync_video', (link) => {
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
    console.log("resume");
    console.log("RESUME: ", {roomId});
    socket.emit("on_resume", {roomId});
  };

  const resumeAll = () => {
    setPlaying(true);
  };

  const endVideo = () => { // hasEnded
    console.log("end");
    socket.emit("is_ended", {roomId});
  };

  // Setting the next video
  const handleEnd = () => {
   
      setLink(uniqueVideos[0]);
 
  };


  
  const nextVideo = () => {
    setEnded(false)
    
  }

  // Pause useEffect
  useEffect(() => {
    console.log("USE EFFECT IS RUNNING")
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
   
    
    console.log("HANDLE END: ", uniqueVideos)
    //uniqueVideos.shift();
    setLink(uniqueVideos[0] ? uniqueVideos[0] : undefined);///
    
    
    
    socket.on("end", () => {
    
      uniqueVideos.shift();
      handleEnd();
      console.log("HANDLE END: ", uniqueVideos)

     
      
    });
    return () => {
      socket.off("end");
    };
  }, [allVideos.length]);



  if (video.length === 0  || link === undefined) {
    return <div><h1>Add a video</h1></div>;
  }
  return (
    <div className="video-responsive">
      <ReactPlayer
        url = {link}
        playing={playing}
        controls={true}
        width="853px"
        height="480px"
        onPause={() => console.log("paused")}
        onPlay={() => console.log("playing")}
        onEnded={() => {
          handleEnd();
          endVideo();
        }}
        autoPlay={false}
      />
      
      <div>
        {playing ? (
          <button onClick={pauseVideo}>Pause</button>
        ) : (
          <button onClick={resumeVideo}>Resume</button>
        )}
        <button onClick={nextVideo}>Next Song</button>
        
      </div>
    </div>
  );
};

Video.propTypes = {
  link: PropTypes.string.isRequired,
};

export default Video;