import React,{useContext,useState,useEffect} from 'react'
import { Navigate, redirect, useNavigate , Link} from 'react-router-dom';
import { SocketContext } from '../context';
import { PeerContext } from '../PeerContext';
import Peer from 'peerjs';

const JoinRoom = () => {
  const navigate = useNavigate();
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
    <div className='flex flex-col justify-center items-center font-montserrat rounded-lg p-4 shadow w-1/2 mx-auto mt-20'>
      <p className='text-mainWhite text-center text-bold'>Do you have a Room ID? Join your virtual karaoke room below</p>
      <div className='text-center flex items-center'>
        <input
            type="text"
            placeholder="Enter room ID"
            value={room}
            onChange={(event) => setRoom(event.target.value)}
            className="rounded p-2 mr-4"
        />
        <input
            type="text"
            placeholder="Enter your name"
            value={user}
            onChange={(event) => setUser(event.target.value)}
            className="rounded p-2 my-4"
        />
      </div>
      <div>
        <Link to={`/karaoke/${room}`} state={room}>
          <button onClick={handleJoinRoom} className="text-right font-extra-extrabold bg-mainYellow rounded-md hover:bg-mainWhite transition-colors duration-200 ease-in-out p-2">JOIN ROOM</button>
        </Link>
      </div>
      <div className="mt-4">
        <p><Link to={"/signup"} className="text-mainWhite hover:text-gray-500 hover:underline transition-all text-sm">Or register an account to create a room of your own</Link></p>
      </div>
    </div>
  )
}

export default JoinRoom;