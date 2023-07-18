import React from 'react'
import { useEffect, useContext, useState } from 'react';
import {useSelector} from 'react-redux'
import { SocketContext } from '../../../context';






const MusicCard = ({video}) => {


    return(
        <div>
            {console.log(video)}
            <p>{video.title}</p>
            <img src={video.thumbnail} alt={"No image"}/>
        </div>
    );
    


}


export default MusicCard;