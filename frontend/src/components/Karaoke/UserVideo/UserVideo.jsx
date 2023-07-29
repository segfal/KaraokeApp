// import React, { useEffect, useRef, useState } from "react";
// import { SingleUserVideo } from "./SingleUserVideo.jsx";

// const UserVideo = ({ socket, peer }) => {
//   const video = useRef();
//   const [videoView, setVideoView] = useState(true);
//   const [userStream, setUserStream] = useState();
//   const [peers, setPeers] = useState({});
//   // const [isMounted, setIsMounted] = useState(true);
//   const [mute, setMute] = useState(false);

//   useEffect(() => {
//     const getDeviceMedia = async () => {
//       try {
//         const mediaStream = await navigator.mediaDevices.getUserMedia({
//           audio: true,
//           video: true,
//         });

//         // if (video.current && mediaStream) {
//           video.current.srcObject = mediaStream;
//         // }

//         setUserStream(mediaStream);

//         peer.on("call", (call) => {
//           call.answer(mediaStream);
//           call.on("stream", (userVideoStream) => {
//             setPeers((prevPeers) => ({ ...prevPeers, [call.peer]: userVideoStream }));
//           });
//           // call.on("close", () => {
//           //   console.log("Cleaning up resources");
//           //   // if (isMounted) {
//           //     setPeers((prevPeers) => {
//           //       const newPeers = { ...prevPeers };
//           //       delete newPeers[call.peer];
//           //       return newPeers;
//           //     });
//           //   }
//           // // }
//           // );
//         });

//         // video.current.addEventListener("loadedmetadata", () => {
//         //   // Now the video stream is ready, initiate the peer call
//         //   peer.on("call", (call) => {
//         //     call.answer(mediaStream);
//         //     call.on("stream", (userVideoStream) => {
//         //       setPeers((prevPeers) => ({ ...prevPeers, [call.peer]: userVideoStream }));
//         //     });
//         //     call.on("close", () => {
//         //       console.log("Cleaning up resources");
//         //       setPeers((prevPeers) => {
//         //         const newPeers = { ...prevPeers };
//         //         delete newPeers[call.peer];
//         //         return newPeers;
//         //       });
//         //     });
//         //   })

//         socket.on("user-connected", (userId) => {
//           setTimeout(() => {
//             const call = peer.call(userId, mediaStream);
//             call.on("stream", (userVideoStream) => {
//               setPeers((prevPeers) => ({ ...prevPeers, [call.peer]: userVideoStream }));
//             });
//             // call.on("close", () => {
//             //   console.log("Cleaning up resources");
//             //   // if (isMounted) {
//             //     setPeers((prevPeers) => {
//             //       const newPeers = { ...prevPeers };
//             //       delete newPeers[call.peer];
//             //       return newPeers;
//             //     });
//             //   }
//             // // }
//             // );
//           }, 1000);
//         });
//       } catch (error) {
//         console.error("Error accessing media devices:", error);
//       }
//     };

//     getDeviceMedia();

//     return () => {
//       // setIsMounted(false);
//       userStream?.getTracks().forEach((track) => track.stop());
//       socket.off('user-connected');
//     };
//   }, [socket, peer]);

//   useEffect(() => {
//     const handleUserDisconnected = (userId) => {
//       alert(`${userId} has left`);
//       // if (isMounted) {
//         setPeers((prevPeers) => {
//           const newPeers = { ...prevPeers };
//           delete newPeers[userId];
//           return newPeers;
//         });
//       // }
//     };

//     socket.on("user-disconnected", handleUserDisconnected);

//     return () => {
//       socket.off("user-disconnected", handleUserDisconnected);
//     };
//   }, []);

//   const handleMute = () => {
//     setMute(!mute);
//     userStream.getAudioTracks()[0].enabled = mute;
//   };

//   const handleVideo = () => {
//     setVideoView(!videoView);
//     userStream.getVideoTracks()[0].enabled = videoView;
//   };

//   console.log(peers);

//   return (
//     <div id="video-group">
//       <div>Video</div>
//       <video className="user-vid" ref={video} autoPlay muted={true}></video>
//       <button onClick={handleMute}>Mute Audio</button>
//       <button onClick={handleVideo}>Start Video</button>
//       {Object.keys(peers).map((peerId, i) => (
//         <SingleUserVideo key={i} videoStream={peers[peerId]} />
//       ))}
//     </div>
//   );
// };

// export default UserVideo;

import React, { useEffect, useRef, useState } from "react";
import { SingleUserVideo } from "./SingleUserVideo.jsx";

const UserVideo = ({ socket, peer }) => {
  const video = useRef();
  const [videoView, setVideoView] = useState(true);
  const [userStream, setUserStream] = useState();
  const [peers, setPeers] = useState({});
  const [mediaReady, setMediaReady] = useState(false);
  // const [isMounted, setIsMounted] = useState(true);
  const [mute, setMute] = useState(false);

  useEffect(() => {
    console.log("Is media ready? ", mediaReady)
    const getDeviceMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });

        // if (video.current && mediaStream) {
        video.current.srcObject = mediaStream;
        // }

        setUserStream(mediaStream);
        // if (video) {
        //   setMediaReady(!mediaReady);
        // }

        // video.addEventListener("loadedmetadata", () => {
        //   console.log(
        //     "The duration and dimensions of the media and tracks are now known."
        //   );
        // });

        peer.on("call", async (call) => {
          // if (mediaReady) {
            try {
              const stream = await navigator.mediaDevices.getUserMedia(
                  {
                      audio: true,
                      video: true,
                  });
                  call.answer(stream);
                  call.on("stream", (userVideoStream) => {
                    console.log("sending call")
                    console.log(" 2: hello")
                    setPeers((prevPeers) => ({
                      ...prevPeers,
                      [call.peer]: userVideoStream,
                    }));
                  });
                }catch (err) {
                  console.log('*** ERROR returning the stream: ' + err);
                };
            console.log("answering call")
        });

        socket.on("user-connected", (userId) => {
          console.log("Is media ready? ", mediaReady)
          // setTimeout(()=> {
            // if (mediaReady) {
              
              setTimeout(() => {
                console.log("Executing peer call")
                const call = peer.call(userId, mediaStream);
                call.on("stream", (userVideoStream) => {
                  console.log("receiving call")
                  setPeers((prevPeers) => ({
                    ...prevPeers,
                    [call.peer]: userVideoStream,
                  }));
                });
              }, 2000);
            }
          // }, 1000)
          
        // }
        );
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    getDeviceMedia();

    return () => {
      // setIsMounted(false);
      userStream?.getTracks().forEach((track) => track.stop());
      socket.off("user-connected");
    };
  }, [socket, peer, mediaReady]);

  useEffect(() => {
    const handleUserDisconnected = (userId) => {
      alert(`${userId} has left`);
      // if (isMounted) {
      setPeers((prevPeers) => {
        const newPeers = { ...prevPeers };
        delete newPeers[userId];
        return newPeers;
      });
      // }
    };

    socket.on("user-disconnected", handleUserDisconnected);

    return () => {
      socket.off("user-disconnected", handleUserDisconnected);
    };
  }, []);

  const handleMute = () => {
    setMute(!mute);
    userStream.getAudioTracks()[0].enabled = mute;
  };

  const handleVideo = () => {
    setVideoView(!videoView);
    userStream.getVideoTracks()[0].enabled = videoView;
  };

  const handleLoad = () => {
    console.log("Media is ready");
    setTimeout(()=> {
      setMediaReady(true);
    }, 1000)
    
  }

  console.log(peers);

  return (
    <div id="video-group">
      <div>Video</div>
      <video className="user-vid" ref={video} autoPlay muted={true} onLoadedData={handleLoad}></video>
      <button onClick={handleMute}>Mute Audio</button>
      <button onClick={handleVideo}>Start Video</button>
      {Object.keys(peers).map((peerId, i) => (
        <SingleUserVideo key={i} videoStream={peers[peerId]} />
      ))}
    </div>
  );
};

export default UserVideo;
