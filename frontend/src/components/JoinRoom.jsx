import React,{useContext,useState,useEffect} from 'react'
import { Navigate, redirect, useNavigate , Link} from 'react-router-dom';
import { SocketContext } from '../context';

const JoinRoom = () => {
  const socket = useContext(SocketContext);
  const [room, setRoom] = useState('');
  const [user, setUser] = useState('');
  
  const handleJoinRoom = () => {
    socket.emit('joinRoom', {room,user});
  };
  
  return (
    <div>
        <input
            type="text"
            placeholder="Enter room ID"
            value={room}
            onChange={(event) => setRoom(event.target.value)}
        />
        <input
            type="text"
            placeholder="Enter your name"
            value={user}
            onChange={(event) => setUser(event.target.value)}
        />
        <Link to={`/karaoke/${room}`} state={room}>
            <button onClick={handleJoinRoom}>Join Room</button>
        </Link>
    </div>
  )
}

export default JoinRoom;