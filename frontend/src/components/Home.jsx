import React,{useState,useEffect} from 'react'
import { Navigate, redirect, useNavigate , Link} from 'react-router-dom';
import io from 'socket.io-client';


const socket = io('http://localhost:4000');

const Home = () => {
  // const [room, setRoom] = useState('');

  // const navigate = useNavigate();
  // const handleJoinRoom = () => {
  //   socket.emit('joinRoom', room);
  // };

  const handleCreateRoom = () => {
    socket.emit('createRoom', socket.id);
    console.log("CREATE ROOM: ", socket.id);
    console.log("CR SOCKET: ", socket)
    // navigate(`/karaoke/${socket.id}`);
  }
  
  return (
    <div>
      <h1>Home</h1>
      <Link to={`/karaoke/${socket.id}`} state={socket}>
      <button onClick={handleCreateRoom}>Create Room</button>
      </Link>
      <div>
        <input
          type="text"
          placeholder="Enter room name"
          // value={room}
          // onChange={(event) => setRoom(event.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your name"
          // value={room}
          // onChange={(event) => setRoom(event.target.value)}
        />
        {/* <button onClick={handleJoinRoom}>Join Room</button> */}
      </div>
    </div>
  )
}

export default Home