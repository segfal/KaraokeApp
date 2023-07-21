import React,{useContext,useState,useEffect} from 'react'
import { Navigate, redirect, useNavigate , Link} from 'react-router-dom';
import { SocketContext } from '../context';
// import io from 'socket.io-client';


// const socket = io('http://localhost:4000');

const Home = () => {
  const socket = useContext(SocketContext);
  // const [roomId, setRoomId] = useState(socket.id);
  const [room, setRoom] = useState('');
  const [user, setUser] = useState('');

  const navigate = useNavigate();
  const handleJoinRoom = () => {
    socket.emit('joinRoom', {room,user});
    // navigate(`/karaoke/${room}`);
  };

  const handleCreateRoom = () => {
    socket.emit('createRoom', socket.id);
    // setRoomId(socket.id);
    //console.log("CREATE ROOM: ", socket.id);
    //console.log("CR SOCKET: ", socket)
    navigate(`/karaoke/${socket.id}`);
  }


  
  
  return (
    <div>
      <h1>Home</h1>
      {/* <Link to={`/karaoke/${roomId}`}> */}
      {console.log("SOCKET ID: ", socket.id)}

      <button onClick={handleCreateRoom}>Create Room</button>
      {/* </Link> */}
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
    </div>
  )
}

export default Home