import React from 'react'
import { useEffect, useContext, useState } from 'react';
import {useSelector} from 'react-redux'
import { SocketContext } from '../../../context';


/* The queue is supposed to contain a map of videos
* Add an item to search and then place that in a queue of vids: first in, first out
* The first video added to queue would play first, the rest added to a queue
* When a video finishes, the next one plays so there has to be some kind of condition being made or
    the admin manually selects the video.

*/
const Queue = () => {
  const allVideos = useSelector((state) => state.video.allVideos);
  const [vidInfo, setVidInfo] = useState([]);
  const socket = useContext(SocketContext);


  useEffect(() => {
    socket.on('vid_info', (title) => {
      setVidInfo(vidInfo => [...vidInfo, title]);
      console.log("All Videos", allVideos);
      console.log("VIDEO_INFO: ",vidInfo)
    })

    return () => {
      socket.off("vid_info");
    };
  }, [])

  return (
    <div>
      <div>Queue</div>
      {/* {allVideos.map((video) => (
        <h3>{video}</h3>
      ))} */}
      {vidInfo.map((title) => (
        <h3>{title}</h3>
      ))}
    </div>
  )

}

export default Queue