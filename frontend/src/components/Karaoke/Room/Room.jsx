import Video from '../Video/Video';
import Participants from '../Participants/Participants';
import Search from '../Search/Search';
import Queue from '../Queue/queue';
import ShareButton from '../../ShareButton/ShareButton';
import React, { useEffect, useState, useContext } from 'react';
// import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { SocketContext } from '../../../context';
import ChatBox from '../ChatBox/ChatBox';

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
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);

  const toggleChatVisibility = () => {
    setIsChatVisible((prevVisible) => !prevVisible);
  };
  return (
    <div>
      {/* <ShareButton/> */}
      {/* <Queue/> */}
      {/* <Participants/>  */}
      <h1>Room</h1>
      <h2>Room ID: {room}</h2>
      <Search roomId={room} />
      <button onClick={toggleChatVisibility}>
        {isChatVisible ? 'Hide Chat' : 'Show Chat'}
      </button>
      {isChatVisible && (
        <ChatBox roomId={room} messages={messages} setMessages={setMessages} />
      )}
    </div>
  );
};

export default Room;
