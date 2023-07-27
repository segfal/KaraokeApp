import Video from '../Video/Video';
import Participants from '../Participants/Participants';
import Queue from '../Queue/queue';
import ShareButton from '../../ShareButton/ShareButton';
// import io from 'socket.io-client';
import Search from '../Search/Search';
import ChatBox from '../ChatBox/ChatBox';
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const location = useLocation();
  const room = location.state ? location.state : socket.id;
  const [isCopied, setIsCopied] = useState(false);
  // const [messages, setMessages] = useState([]);

  const handleCopyId = () => {
    navigator.clipboard.writeText(socket.id).then(
      function () {
        console.log('Copying to clipboard was successful!');
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      },
      function (err) {
        console.error('Could not copy text: ', err);
      }
    );
  };

  useEffect(() => {
    socket.on('leave_room', () => {
      navigate('/');
      navigate(0);
    });
    return () => socket.off('leave_room');
  }, []);
  const handleLeaveRoom = () => {
    socket.emit('leave_room', socket.id);
    // navigate('/');
    // navigate(0);
  };

  // const emitLeaveRoom = () => {
  //   socket.emit('leave_room', socket.id);

  // }

  return (
    <div>
      {/* <ShareButton/> */}
      {/* <Queue/> */}
      <h1>Room</h1>
      <h2>Room ID: {room}</h2>
      <button onClick={handleCopyId}>Copy Room ID</button>
      {isCopied && <div>Copied to clipboard</div>}
      <Search roomId={room} />
      <User />
      <ChatBox roomId={room} />
      <Participants />
      <button onClick={handleLeaveRoom}>Leave Room</button>
    </div>
  );
};

export default Room;
