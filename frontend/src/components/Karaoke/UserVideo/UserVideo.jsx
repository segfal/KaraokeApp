import React, { useEffect, useRef, useState } from "react";
import { SingleUserVideo } from "./SingleUserVideo.jsx";
import { usePeerContext } from "../../../PeerContext";

const UserVideo = ({ socket }) => {
  const video = useRef();
  const [userStream, setUserStream] = useState();
  const [peers, setPeers] = useState({});
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { peer, getSharedStream, createOrGetPeerConnection, monitorPeerStats, mediaError, requestMediaPermissions } = usePeerContext();

  useEffect(() => {
    const setupMedia = async () => {
      setIsLoading(true);
      try {
        const mediaStream = await getSharedStream();
        if (video.current) {
          video.current.srcObject = mediaStream;
        }
        setUserStream(mediaStream);

        peer.on("call", (call) => {
          try {
            call.answer(mediaStream);
            call.on("stream", (userVideoStream) => {
              console.log("Received remote stream from:", call.peer);
              setPeers((prevPeers) => ({
                ...prevPeers,
                [call.peer]: userVideoStream,
              }));
              monitorPeerStats(call.peer);
            });
          } catch (err) {
            console.error('Error answering call:', err);
          }
        });

        socket.on("user-connected", (userId) => {
          console.log("User connected:", userId);
          const call = peer.call(userId, mediaStream);
          call.on("stream", (userVideoStream) => {
            console.log("Received stream from call to:", userId);
            setPeers((prevPeers) => ({
              ...prevPeers,
              [call.peer]: userVideoStream,
            }));
            monitorPeerStats(call.peer);
          });
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error accessing media devices:", error);
        setIsLoading(false);
      }
    };

    setupMedia();

    return () => {
      socket.off("user-connected");
    };
  }, [socket, peer, getSharedStream, monitorPeerStats]);

  useEffect(() => {
    const handleUserDisconnected = (userId) => {
      console.log("User disconnected:", userId);
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
  }, [socket]);

  const handleMute = () => {
    setIsMuted(!isMuted);
    if (userStream?.getAudioTracks()[0]) {
      userStream.getAudioTracks()[0].enabled = !userStream.getAudioTracks()[0].enabled;
    }
  };

  const handleVideo = () => {
    setIsVisible(!isVisible);
    if (userStream?.getVideoTracks()[0]) {
      userStream.getVideoTracks()[0].enabled = !userStream.getVideoTracks()[0].enabled;
    }
  };

  const handleRetryPermissions = async () => {
    await requestMediaPermissions();
    if (video.current && userStream) {
      video.current.srcObject = userStream;
    }
  };

  console.log("Current peers:", peers);

  return (
    <div className="flex items-center justify-center pb-[8px]">
      {/* Local Video */}
      <div className="flex flex-col items-center mr-4 bg-lightGreen px-2 pt-2 rounded h-full ml-4">
        {mediaError ? (
          <div className="w-[200px] h-[150px] bg-gray-800 flex flex-col items-center justify-center text-white text-center p-4">
            <div className="text-sm mb-2">⚠️ {mediaError}</div>
            <button 
              onClick={handleRetryPermissions}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
            >
              Retry Permissions
            </button>
          </div>
        ) : isLoading ? (
          <div className="w-[200px] h-[150px] bg-gray-800 flex items-center justify-center text-white">
            <div className="text-sm">Loading camera...</div>
          </div>
        ) : (
          <video
            className="w-[200px] h-[150px]"
            ref={video}
            autoPlay
            muted={true}
            playsInline
          ></video>
        )}
        <div className="mt-2">
          <button
            onClick={handleMute}
            className={`mr-2 p-2 rounded ${isMuted ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
          >
            {isMuted ? '🔇' : '🎤'}
          </button>
          <button
            onClick={handleVideo}
            className={`p-2 rounded ${isVisible ? 'bg-gray-300' : 'bg-red-500 text-white'}`}
          >
            {isVisible ? '📹' : '🚫'}
          </button>
        </div>
      </div>

      {/* Remote Videos */}
      {Object.entries(peers).map(([peerId, stream]) => (
        <SingleUserVideo key={peerId} videoStream={stream} />
      ))}
    </div>
  );
};

export default UserVideo;
