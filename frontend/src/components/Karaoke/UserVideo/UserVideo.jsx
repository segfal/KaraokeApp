import React, { useEffect, useRef, useState } from "react";
import { SingleUserVideo } from "./SingleUserVideo.jsx";

const UserVideo = ({ socket, peer }) => {
  const video = useRef();
  const [userStream, setUserStream] = useState();
  const [peers, setPeers] = useState({});
  const [mediaReady, setMediaReady] = useState(false);


  useEffect(() => {
    // console.log("Is media ready? ", mediaReady)
    const getDeviceMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });

        video.current.srcObject = mediaStream;
    
        setUserStream(mediaStream);

        peer.on("call", (call) => {
            try {
                  call.answer(mediaStream);
                  call.on("stream", (userVideoStream) => {
                    // console.log("sending call")
                    setPeers((prevPeers) => ({
                      ...prevPeers,
                      [call.peer]: userVideoStream,
                    }));
                  });
                }catch (err) {
                  console.log('*** ERROR returning the stream: ' + err);
                };
            // console.log("answering call")
        });

        socket.on("user-connected", (userId) => {
          console.log("Is media ready? ", mediaReady) 
              setTimeout(() => {
                // console.log("Executing peer call")
                const call = peer.call(userId, mediaStream);
                call.on("stream", (userVideoStream) => {
                  // console.log("receiving call")
                  setPeers((prevPeers) => ({
                    ...prevPeers,
                    [call.peer]: userVideoStream,
                  }));
                });
              }, 2000);
            }
        );
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    getDeviceMedia();

    return () => {
      userStream?.getTracks().forEach((track) => track.stop());
      socket.off("user-connected");
    };
  }, [socket, peer]);

  useEffect(() => {
    const handleUserDisconnected = (userId) => {
      alert(`${userId} has left`);
      setPeers((prevPeers) => {
        const newPeers = { ...prevPeers };
        delete newPeers[userId];
        return newPeers;
      });
    };

    socket.on("user-disconnected", handleUserDisconnected);

    return () => {
      socket.off("user-disconnected", handleUserDisconnected);
    };
  }, []);

  const handleMute = () => {
    userStream.getAudioTracks()[0].enabled = !userStream.getAudioTracks()[0].enabled;
  };

  const handleVideo = () => {
    userStream.getVideoTracks()[0].enabled = !userStream.getVideoTracks()[0].enabled;
  };
  console.log(peers);

  return (
    <div id="video-group">
      <div>Video</div>
      <video className="user-vid" ref={video} autoPlay muted={true} ></video>
      <button onClick={handleMute}>Mute Audio</button>
      <button onClick={handleVideo}>Start Video</button>
      {Object.keys(peers).map((peerId, i) => (
        <SingleUserVideo key={i} videoStream={peers[peerId]} />
      ))}
    </div>
  );
};

export default UserVideo;
