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
        <div>
            {console.log("VIDEO: ", video)}
            
            <h1 className=''>{video.title}</h1>
            <img src={video.thumbnail} alt={"No image"}/>
            {console.log("VIDEO LINK: ", video.link)}
            <button onClick={handleDelete}>
            <img src={trashImg}></img></button>
        </div>
    );
    


}


export default MusicCard;