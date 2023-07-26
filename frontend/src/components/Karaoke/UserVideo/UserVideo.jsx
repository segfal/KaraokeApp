import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../../context.tsx";
import { PeerContext } from "../../../PeerContext.tsx";


import { SingleUserVideo } from "./SingleUserVideo.jsx";

const UserVideo = ({socket, peer}) => {
  const video = useRef(); // This video ref contains your own video
  const [videoView, setVideoView] = useState(true);
  const [userStream, setUserStream] = useState(); // Array of media streams that come from other users
  const [peers, setPeers] = useState({}); // Peers of other users
  const [isMounted, setIsMounted] = useState(true); //Used to force useEffect change
  const [mute, setMute] = useState(false);


  useEffect(() => {
    console.log("peer", peer);
    // console.log("socket", socket);
    const getDeviceMedia = async () => {
        // Gets the mediastream data from webcam
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      if (isMounted && video.current && mediaStream) {
      // Your video stream
      // mediaStream.getAudioTracks()[0].enabled = mute;
      video.current.srcObject = mediaStream;
    }
      //Now is placed in the the array of streams 
      setUserStream(mediaStream);

    //   console.log("Peer", peer);
      peer.on("call", (call) => {
        call.answer(mediaStream);
        call.on("stream", (userVideoStream) => {
          setPeers((prevPeers) => ({ ...prevPeers, [call.peer]: userVideoStream }));
        });
      });

      // When a user connects
      socket.on("user-connected", (userId) => {
        // Use setTimeout to all time for camera data to be retrieved
        setTimeout(() => {
        //  console.log("userid in user-connected", userId);
          const call = peer.call(userId, mediaStream);
          console.log("Call", call);
          console.log("MediaStream", mediaStream)
          call.on("stream", (userVideoStream) => {
            setPeers((prevPeers) => ({ ...prevPeers, [call.peer]: userVideoStream }));
          });
        }, 1000);
      });

      return () => {
        setIsMounted(false);
        mediaStream.getTracks().forEach((track) => track.stop());
      };
    };

    getDeviceMedia();
  }, []);

  useEffect(() => {
    const handleUserDisconnected = (userId) => {
    console.log("handling user disconnect", userId);
    alert(`${userId} has left`)
    if (isMounted) {
        // Clean up resources for the disconnected peer
        setPeers((prevPeers) => {
          const newPeers = { ...prevPeers };
          delete newPeers[userId];
          return newPeers;
        });
      }
    };

    socket.on("user-disconnected", handleUserDisconnected);

    return () => {
      socket.off("user-disconnected", handleUserDisconnected);
    };
  }, []);

  useEffect(() => {
    peer.on("open", (peerId) => {
      console.log("My Peer ID:", peerId);
    });

    peer.on("call", (call) => {
      call.on("close", () => {
        console.log("Cleaning up resorces")
        // Clean up resources for the disconnected peer
        if (isMounted) {
            // Clean up resources for the disconnected peer
            setPeers((prevPeers) => {
              const newPeers = { ...prevPeers };
              delete newPeers[call.peer];
              return newPeers;
            });
          }
      });
    });

    return () => {
      peer.destroy();
    };
  }, []);

  const handleMute = () => {
    setMute(!mute);
    // console.log(mute);
    userStream.getAudioTracks()[0].enabled = mute;
    
  }

  const handleVideo = () => {
    setVideoView(!videoView)
    userStream.getVideoTracks()[0].enabled = videoView;
  }
  console.log(peers)
  return (
    <div id="video-group">
      <div>Video</div>
      <video className="user-vid" ref={video} autoPlay muted={true}></video>
      <button onClick={handleMute} >Mute Audio</button>
      <button onClick={handleVideo}> Start Video</button>
      {Object.keys(peers).map((peerId, i) => (
        <SingleUserVideo key={i} videoStream={peers[peerId]} />
      ))}
    </div>
  );
};

export default UserVideo;