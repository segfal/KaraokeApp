import React,{useContext,useState,useEffect} from 'react'
import { Navigate, redirect, useNavigate , Link} from 'react-router-dom';
import { SocketContext } from '../context';
import { PeerContext } from '../PeerContext';
import Peer from 'peerjs';

const JoinRoom = () => {
  const socket = useContext(SocketContext);
  const peer = useContext(PeerContext);
  const [id, setId] = useState('');
  const [room, setRoom] = useState('');
  const [user, setUser] = useState('');
  
  useEffect(()=> {
    peer.on('open', id => {
      console.log("My Peer connection: ", id);
      setId(id);
    })
  }, [])

  const handleJoinRoom = () => {
    console.log("My Peer connection ", id);
    socket.emit('join_room', {room,user}, id);  //id is coming from the peerjs id.

    let username = user.trim() || 'Anonymous';

    sessionStorage.setItem('username', username);
    navigate(`/karaoke/${room}`);
  };
  
  return (
    <div className='flex flex-col'>
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