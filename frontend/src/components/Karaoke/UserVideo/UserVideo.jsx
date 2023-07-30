import React, { useEffect, useRef, useState } from "react";
import { SingleUserVideo } from "./SingleUserVideo.jsx";

const UserVideo = ({ socket, peer }) => {
  const video = useRef();
  const [userStream, setUserStream] = useState();
  const [peers, setPeers] = useState({});
  const [mediaReady, setMediaReady] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
//    // console.log("Is media ready? ", mediaReady)
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
//                    // console.log("sending call")
                    setPeers((prevPeers) => ({
                      ...prevPeers,
                      [call.peer]: userVideoStream,
                    }));
                  });
                }catch (err) {
//                  console.log('*** ERROR returning the stream: ' + err);
                };
//            // console.log("answering call")
        });

        socket.on("user-connected", (userId) => {
//          console.log("Is media ready? ", mediaReady) 
              setTimeout(() => {
//                // console.log("Executing peer call")
                const call = peer.call(userId, mediaStream);
                call.on("stream", (userVideoStream) => {
//                  // console.log("receiving call")
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
      // alert(`${userId} has left`);
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
    !isMuted ? setIsMuted(true) : setIsMuted(false);
    userStream.getAudioTracks()[0].enabled = !userStream.getAudioTracks()[0].enabled;
  };

  const handleVideo = () => {
    !isVisible ? setIsVisible(true) : setIsVisible(false);
    userStream.getVideoTracks()[0].enabled = !userStream.getVideoTracks()[0].enabled;
  };
//  console.log(peers);

  return (
    <div className="flex items-center justify-center pb-[8px]">
      <div className="flex flex-col items-center mr-4 bg-lightGreen px-2 pt-2 rounded h-full ml-4">
        <video className="w-[200px] h-[150px]" ref={video} autoPlay muted={true} ></video>
        <div className="mt-2">
          <button onClick={handleMute} className="mr-6">
            {!isMuted ? 
              (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-mic-fill" viewBox="0 0 16 16">
                <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
              </svg>)
              : 
              (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-mic-mute-fill" viewBox="0 0 16 16">
                <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879L5.158 2.037A3.001 3.001 0 0 1 11 3z"/>
                <path d="M9.486 10.607 5 6.12V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z"/>
              </svg>)}
          </button>
          <button onClick={handleVideo}>
            {!isVisible ? 
              (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-camera-video-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"/>
              </svg>)
              : 
              (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-camera-video-off-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10.961 12.365a1.99 1.99 0 0 0 .522-1.103l3.11 1.382A1 1 0 0 0 16 11.731V4.269a1 1 0 0 0-1.406-.913l-3.111 1.382A2 2 0 0 0 9.5 3H4.272l6.69 9.365zm-10.114-9A2.001 2.001 0 0 0 0 5v6a2 2 0 0 0 2 2h5.728L.847 3.366zm9.746 11.925-10-14 .814-.58 10 14-.814.58z"/>
              </svg>
              )}
          </button>
        </div>
      </div>
      {Object.keys(peers).map((peerId, i) => (
        <SingleUserVideo key={i} videoStream={peers[peerId]} />
      ))}
    </div>
  );
};

export default UserVideo;
