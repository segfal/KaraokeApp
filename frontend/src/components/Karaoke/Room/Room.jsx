import Video from '../Video/Video'
import Participants from '../Participants/Participants'
import Search from '../Search/Search'
import Queue from '../Queue/queue'
import ShareButton from '../../ShareButton/ShareButton'
import React, { useEffect, useState, useContext } from 'react';
// import io from 'socket.io-client';
import { useLocation } from 'react-router-dom'
import { SocketContext } from '../../../context'

// const socket = io('http://localhost:4000');

// Future: search bar and queue option
const Room = () => {
  const socket = useContext(SocketContext);
  const location = useLocation();
  // const roomId = socket.id;
  // const room = location.state;
  const room = location.state?location.state:socket.id;
  // const roomId = location.state; // socket.id
  // const [room, setRoom] = useState('');
  
  return (
    <div>
      <h1>Room</h1>
      <h2>Room ID: {room}</h2>
      {/* <ShareButton/> */}
      <Search roomId={room}/>
      {/* <Queue/> */}
      
      {/* <Participants/>  */}
    </div>
    
  )
}

export default Room