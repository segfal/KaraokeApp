import React from 'react'
import { useEffect, useContext, useState} from 'react';
import {useSelector , useDispatch} from 'react-redux'
import { SocketContext } from '../../../context';
import {removeVideo, removeVideoThunk} from '../../../redux/Video/Video.action'
import { syncVideoInfo,syncVideo } from '../../../redux/Video/Video.action';




const MusicCard = ({video}) => {
    const trashImg = "https://img.icons8.com/ios/50/000000/trash.png";
    const allVideos = useSelector((state) => state.video.uniqueVideos);
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();



    useEffect(()=> {
        socket.on('remove_video', (data)=> {
            dispatch(removeVideo(data.videoLink, data.roomId))
        })
    },[])

    const handleDelete = () => {
        console.log("BUTTON CLICKED");
        // dispatch(removeVideo(video.link, socket.id))
        socket.emit("remove_video", {videoLink: video.link, roomId: socket.id});
        // dispatch(removeVideoThunk(video.link, socket.id))
        // .then(dispatch(syncVideoInfo(video)));
        // dispatch(syncVideo(video.link));
        console.log("ALL VIDEOS: ", allVideos);
    }
  


    
    return(
        <div className='flex mt-3 w-full justify-between'>
            {console.log("VIDEO: ", video)}
            <div className='flex justify-items-start'>
                <img src={video.thumbnail} alt={"No image"}/>
                <div className='w-70'>
                    <h1 className='mx-2 text-sm font-extra-extrabold'>{video.title}</h1>
                </div>
            </div>
            {console.log("VIDEO LINK: ", video.link)}
            <button onClick={handleDelete} className="justify-items-end">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>
        </div>
    );
    


}


export default MusicCard;