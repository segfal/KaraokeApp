import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import JoinRoom from './JoinRoom';
import { SocketContext } from '../context';

const Profile = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleCreateRoom = () => {
    const roomId = socket.id;
    const displayName = username.trim() || 'Anonymous';
    socket.emit('create_room', roomId, displayName);
    sessionStorage.setItem('username', displayName);
    navigate(`/karaoke/${roomId}`);
  };

  return (
    <div className='bg-mainGreen font-montserrat h-screen pt-15 flex items-center justify-center'>
      <div className='mb-80'>
        <h1 className='font-extra-extrabold text-3xl mb-4 text-mainWhite'>Welcome to Serenade!</h1>
        <div className='flex items-center justify-center -ml-4 text-mainWhite'>
          <div className="w-24 h-24 rounded-full overflow-hidden m-2 bg-mainYellow flex items-center justify-center">
            <span className="text-2xl">🎤</span>
          </div>
          <div>
            <h2 className='font-extra-extrabold uppercase text-lg'>Karaoke Enthusiast</h2>
            <h2>Ready to sing!</h2>
          </div>
        </div>
      </div>
      <div className='ml-20'>
        <h1 className='text-center text-2xl text-mainWhite'>Ready to start serenading? ♫</h1>
        <div>
          <div className='flex flex-col justify-center items-center font-montserrat rounded-lg p-4 shadow w-1/2 mx-auto mt-10'>
            <p className='text-mainWhite text-center text-bold'>Start a room below with a shareable Room ID your friends can use to join.</p>
            <input
              type="text"
              placeholder="Enter your name (optional)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded p-2 mb-4 w-full"
            />
            <button onClick={handleCreateRoom} className="font-extra-extrabold bg-mainYellow rounded-md hover:bg-mainWhite transition-colors duration-200 ease-in-out p-2 uppercase">Create Room</button>
          </div>
          <div className='flex flex-col justify-center items-center font-montserrat rounded-lg p-4 shadow w-3/4 mx-auto mt-10'>
            <JoinRoom />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
