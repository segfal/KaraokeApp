import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../context';

const SimpleHome = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const handleCreateRoom = () => {
    const generatedUsername = username || 'Anonymous';
    socket.emit('create_room', socket.id, generatedUsername);
    sessionStorage.setItem('username', generatedUsername);
    navigate(`/karaoke/${socket.id}`);
  };

  const handleJoinRoom = () => {
    if (!roomId.trim()) {
      alert('Please enter a room ID');
      return;
    }
    const generatedUsername = username || 'Anonymous';
    socket.emit('join_room', { room: roomId, name: generatedUsername }, socket.id);
    sessionStorage.setItem('username', generatedUsername);
    navigate(`/karaoke/${roomId}`);
  };

  return (
    <div className='bg-mainGreen font-montserrat h-screen pt-15 flex items-center justify-center'>
      <div className='text-center'>
        <h1 className='font-extra-extrabold text-4xl mb-8 text-mainWhite'>
          🎤 Karaoke Video Chat
        </h1>
        
        <div className='bg-white rounded-lg p-8 shadow-lg max-w-md mx-auto'>
          <h2 className='text-2xl font-bold mb-6 text-gray-800'>Join the Party!</h2>
          
          <div className='mb-4'>
            <input
              type="text"
              placeholder="Enter your name (optional)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
          </div>

          <div className='space-y-4'>
            <div>
              <h3 className='font-bold text-gray-700 mb-2'>Create a New Room</h3>
              <button 
                onClick={handleCreateRoom}
                className="w-full bg-mainYellow hover:bg-yellow-400 text-black font-bold py-3 px-4 rounded-md transition-colors"
              >
                Create Room
              </button>
            </div>

            <div className='border-t pt-4'>
              <h3 className='font-bold text-gray-700 mb-2'>Join Existing Room</h3>
              <input
                type="text"
                placeholder="Enter room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
              />
              <button 
                onClick={handleJoinRoom}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md transition-colors"
              >
                Join Room
              </button>
            </div>
          </div>

          <div className='mt-6 text-sm text-gray-600'>
            <p>✨ No login required - just enter a name and start singing!</p>
            <p>🎵 Share the room ID with friends to join together</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleHome;
