import React from 'react'
import { useEffect, useContext, useState } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { SocketContext } from '../../../context';
import { syncVideoInfo } from '../../../redux/Video/Video.action';

import MusicCard from './MusicCard';
import axios from 'axios';


/* The queue is supposed to contain a map of videos
* Add an item to search and then place that in a queue of vids: first in, first out
* The first video added to queue would play first, the rest added to a queue
* When a video finishes, the next one plays so there has to be some kind of condition being made or
    the admin manually selects the video.

*/
const Queue = () => {
  
  const vidInfo = useSelector((state) => state.video.uniqueVidInfo);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  console.log("VIDEO INFO: ", vidInfo);
 
  



  useEffect(() => {
    socket.on('vid_info', (newElement) => {
      ///add it to vidInfo
      console.log("NEW ELEMENT: ", newElement);
      //vidInfo.push(newElement);
      dispatch(syncVideoInfo(newElement));

    })

    return () => {
      socket.off("vid_info");
    };
  }, [])

  return (
    <div className='bg-bgGreen p-3 mt-[69px] rounded overflow-y-auto h-[683px]'>
      <h1 className='text-xl font-extra-black'>Up Next</h1>

      {console.log("QUEUE: ", vidInfo)}
      
      {vidInfo.map((video, index) => (
        <div key={index} className={index === 0 ? 'bg-red' : ''}>
          <MusicCard video={video}/>
        </div>
      ))}
    </div>
  )

}

export default Queue