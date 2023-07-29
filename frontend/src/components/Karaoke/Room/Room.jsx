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
    <div className='bg-lightGreen font-montserrat flex flex-col items-center'>
      <h1 className='text-4xl pb-1 mt-20 font-extra-extrabold uppercase'>Serenade Room</h1>
      <div className='flex'>
        <h2>Room ID: {room}</h2>
        <button onClick={handleCopyId}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
          </svg>
        </button>
      </div>

      {isCopied && <div>Copied to clipboard</div>}
      <Search roomId={room} />
      <User />
      <ChatBox roomId={room} />
      <Participants />
      <button onClick={handleLeaveRoom} className="text-right font-extra-extrabold bg-red-700 text-white rounded-md hover:bg-mainWhite transition-colors duration-200 ease-in-out p-2 mb-2">Leave Room</button>
    </div>
  );
};

export default Room;
