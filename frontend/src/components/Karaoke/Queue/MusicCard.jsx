import React from 'react'
import { useEffect, useContext, useState} from 'react';
import {useSelector , useDispatch} from 'react-redux'
import { SocketContext } from '../../../context';
import {removeVideoThunk} from '../../../redux/Video/Video.action'
import { syncVideoInfo,syncVideo } from '../../../redux/Video/Video.action';




const MusicCard = ({video}) => {
    const trashImg = "https://img.icons8.com/ios/50/000000/trash.png";
    const allVideos = useSelector((state) => state.video.uniqueVideos);
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();





    const handleDelete = () => {
        console.log("BUTTON CLICKED");
        dispatch(removeVideoThunk(video.link));
        dispatch(syncVideoInfo(video));
        dispatch(syncVideo(video.link));
        console.log("ALL VIDEOS: ", allVideos);
    }
  


    
    return(
        <div>
            {console.log("VIDEO: ", video)}
            
            <h1>{video.title}</h1>
            <img src={video.thumbnail} alt={"No image"}/>
            {console.log("VIDEO LINK: ", video.link)}
            <button onClick={handleDelete}>
            <img src={trashImg}></img></button>
        </div>
    );
    


}


export default MusicCard;