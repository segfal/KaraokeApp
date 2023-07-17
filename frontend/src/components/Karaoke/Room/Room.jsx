import Video from '../Video/Video'
import Participants from '../Participants/Participants'
import Search from '../Search/Search'
import Queue from '../Queue/queue'
import ShareButton from '../../ShareButton/ShareButton'
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom'

const socket = io('http://localhost:4000');

// Future: search bar and queue option
const Room = () => {
  const location = useLocation();
  const socket = location.state;
  const roomId = location.state.id; // socket.id
  // const [room, setRoom] = useState('');
  
  return (
    <div>
      <h1>Room</h1>
      <h2>Room ID: {roomId}</h2>
      {/* <ShareButton/> */}
      <Search socket={socket} roomId={roomId}/>
      {/* <Queue/> */}
      
      {/* <Participants/>  */}
    </div>
    
  )
}

export default Room