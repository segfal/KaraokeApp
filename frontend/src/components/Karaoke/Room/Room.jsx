
import Participants from '../Participants/Participants';
// import Queue from '../Queue/queue';
// import ShareButton from '../../ShareButton/ShareButton';
// import io from 'socket.io-client';
import Search from '../Search/Search';
import ChatBox from '../ChatBox/ChatBox';
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SocketContext } from '../../../context';
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
  const [isVisible, setIsVisible] = useState(true); // Participants visibility
  const [isChatVisible, setIsChatVisible] = useState(false);
  
  // Participants visibility

  const toggleVisibility = () => {
    setIsVisible((prevVisible) => !prevVisible);
    setIsChatVisible((prevVisible) => !prevVisible);
  };

  // Chat visibility

  const toggleChatVisibility = () => {
    setIsChatVisible((prevVisible) => !prevVisible);
    setIsVisible((prevVisible) => !prevVisible)
  };

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

  useEffect(()=> {
    if(room===undefined) {
      alert("You're not connected to a room! Returning to home!")
      handleLeaveRoom();
    }
  })
  useEffect(() => {
    socket.on('leave_room', () => {
      navigate('/')
      navigate(0);
    });
    return () => socket.off('leave_room');
  }, []);

  const handleLeaveRoom = () => {
    socket.emit('leave_room', socket.id);
    console.log("Emitting leave_room");
    // navigate('/');
    // navigate(0);
  };
  
  useEffect(() => {
    const handleBeforeUnload = () => {
     socket.emit('leave_room', socket.id);
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className='bg-lightGreen font-montserrat flex flex-col'>
      <div className='flex flex-col items-center mb-2'>
        <h1 className='text-4xl pb-1 mt-20 font-extra-extrabold uppercase'>Serenade Room</h1>
        <div className='flex items-center justify-center text-center'>
          <h2>Room ID: {room}</h2>
         
          <button onClick={handleCopyId}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
            </svg>
          </button>
        </div>
      </div>

      {isCopied && <div className='text-center text-gray-500 mb-2'>Copied to clipboard</div>}
      <Search roomId={room} />
      <div className='flex items-center justify-center w-screen'>
        <div className='bg-bgGreen rounded p-3 m-3 h-[226px] max-w-[2/3] mx-3'>
          <div className='flex flex-wrap nowrap'>
            <User />
          </div>
        </div>
        <div className='w-[405px] mx-3 flex flex-col items-center justify-center h-[226px] bg-bgGreen rounded '>
          <div>
            {isVisible && <Participants />}
            {isChatVisible && <ChatBox roomId={room}/>}
          </div>
          <div className='flex'>
            <div id="participants">
              <button onClick={toggleVisibility} className={isVisible ? "bg-lightGreen rounded p-2" : "p-2"}>
                {isVisible ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                </svg>
                : 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
                </svg>
                }
              </button>
            </div>
            <div id="chat">
              <button onClick={toggleChatVisibility} className={isChatVisible ? "bg-lightGreen rounded p-2 mx-6" : "p-2 mx-6"}>
                {isChatVisible ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chat-fill" viewBox="0 0 16 16">
                  <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
                </svg>
                : 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                  <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                </svg>}
              </button>
            </div>
            <button onClick={handleLeaveRoom} className="font-extra-extrabold bg-red-700 text-white rounded-md hover:bg-mainWhite transition-colors duration-200 ease-in-out p-2 w-16">Leave</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
