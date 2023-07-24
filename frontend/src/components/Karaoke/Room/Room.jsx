import Video from '../Video/Video';
import Participants from '../Participants/Participants';
import Queue from '../Queue/queue';
import ShareButton from '../../ShareButton/ShareButton';
// import io from 'socket.io-client';
import Search from '../Search/Search';
import ChatBox from '../ChatBox/ChatBox';
import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { SocketContext } from '../../../context';
import UserVideo from '../UserVideo/UserVideo';
import User from '../UserVideo/User';

// const socket = io('http://localhost:4000');
// Future: search bar and queue option

const Room = () => {
  // const roomId = socket.id;
  // const room = location.state;
  // const roomId = location.state; // socket.id
  // const [room, setRoom] = useState('');
  const socket = useContext(SocketContext);
  const location = useLocation();
  const room = location.state ? location.state : socket.id;
  // const [messages, setMessages] = useState([]);

  return (
    <div>
      {/* <ShareButton/> */}
      {/* <Queue/> */}
      {/* <Participants/>  */}
      <h1>Room</h1>
      <h2>Room ID: {room}</h2>
      <Search roomId={room} />
      <User />
      <ChatBox roomId={room} />
    </div>
  );
};

export default Room;
