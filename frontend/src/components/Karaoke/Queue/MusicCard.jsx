import React from 'react'
import { useEffect, useContext, useState } from 'react';
import {useSelector} from 'react-redux'
import { SocketContext } from '../../../context';






const MusicCard = ({video}) => {
    const trashImg = "https://img.icons8.com/ios/50/000000/trash.png";
    return(
        <div>
            {console.log(video)}
            <p>{video.title}</p>
            <img src={video.thumbnail} alt={"No image"}/>
            <button><img src="trashImg" alt="share"></img></button>
        </div>
    );
    


}


export default MusicCard;