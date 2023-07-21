import React from 'react'
import { useEffect, useContext, useState } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { SocketContext } from '../../../context';

import MusicCard from './MusicCard';
import axios from 'axios';


/* The queue is supposed to contain a map of videos
* Add an item to search and then place that in a queue of vids: first in, first out
* The first video added to queue would play first, the rest added to a queue
* When a video finishes, the next one plays so there has to be some kind of condition being made or
    the admin manually selects the video.

*/
const Queue = () => {
  
  const vidInfo = useSelector((state) => state.video.vidInfo);
  const socket = useContext(SocketContext);
  console.log("VIDEO INFO: ", vidInfo);
 
  



  useEffect(() => {
    socket.on('vid_info', (newElement) => {
      ///add it to vidInfo
      console.log("NEW ELEMENT: ", newElement);
      vidInfo.push(newElement);
    })

    return () => {
      socket.off("vid_info");
    };
  }, [])

  return (
    <div>
      <div>Queue</div>

      {console.log("QUEUE: ", vidInfo)}
      
      {vidInfo.map((video, index) => (
        <MusicCard key={index} video={video}/>
      ))}
    </div>
  )

}

export default Queue