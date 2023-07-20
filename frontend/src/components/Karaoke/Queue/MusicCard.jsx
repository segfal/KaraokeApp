import React from 'react'
import { useEffect, useContext, useState} from 'react';
import {useSelector , useDispatch} from 'react-redux'
import { SocketContext } from '../../../context';
//import {removeVideoThunk} from '../../../redux/Video/Video.action'




const MusicCard = ({video}) => {
    const trashImg = "https://img.icons8.com/ios/50/000000/trash.png";
    const allVideos = useSelector((state) => state.video.allVideos);
    const socket = useContext(SocketContext);





    const handleDelete = () => {
        console.log("DELETE: ", video.link);
        const index = allVideos.indexOf(video.link);
        console.log("INDEX: ", index);
        ///remove all occurences of video.link from allVideos
        const filtered = allVideos.filter((link) => link !== video.link);
        console.log("FILTERED: ", filtered);
        //set allVideos to filtered

    }

    useEffect(() => {


    },[allVideos.length])


    
    return(
        <div>
            {console.log("VIDEO: ", video)}
            
            <h1>{video.title}</h1>
            <img src={video.thumbnail} alt={"No image"}/>
            <button
            onClick={handleDelete}>
            <img src={trashImg}></img></button>
        </div>
    );
    


}


export default MusicCard;