import React, { useContext, useState, useEffect } from 'react';
import { Navigate, redirect, useNavigate, Link } from 'react-router-dom';
import { SocketContext } from '../context';

import JoinRoom from './JoinRoom';

import { PeerContext } from '../PeerContext';
import Peer from 'peerjs';

// import io from 'socket.io-client';

// const socket = io('http://localhost:4000');

const Home = () => {
  const socket = useContext(SocketContext);
  const peer = useContext(PeerContext);
  // const [roomId, setRoomId] = useState(socket.id);
  const [id, setId] = useState("");
  const [room, setRoom] = useState('');
  const [user, setUser] = useState('');

  

  useEffect(()=> {
    peer.on('open', id => {
      console.log("My Peer connection: ", id);
      setId(id);
    })
  }, [])

  // const handleJoinRoom = () => {
  //   // myPeer.on('open', id => {
  //       console.log("My Peer connection ", id);
  //       socket.emit('join_room', room , id );
  //       // socket.emit('join_room', room);
  //   // })
    
  //   // navigate(`/karaoke/${room}`);
  // };

  const navigate = useNavigate();

  
  //OLD HANDLE
  // const handleJoinRoom = () => {
  //   socket.emit('joinRoom', {room,user});
  // };

  // const handleCreateRoom = () => {
  //   socket.emit('createRoom', socket.id);
  //   // setRoomId(socket.id);
  //   console.log("CREATE ROOM: ", socket.id);
  //   console.log("CR SOCKET: ", socket)
  //   navigate(`/karaoke/${socket.id}`);
  // }

  const handleLogin = () => {
    navigate("/login");
  }
  

  // CHAT BOX HANDLE
//   const handleJoinRoom = () => {

//     console.log("My Peer connection ", id);
//     socket.emit('join_room', {room,user}, id);  //id is coming from the peerjs id.

//     let username = user.trim() || 'Anonymous';

//     sessionStorage.setItem('username', username);

//     // navigate(`/karaoke/${room}`);
//   };

//   const handleCreateRoom = () => {

//     socket.emit('create_room', socket.id);

//     let username = user.trim() || 'Admin';
    

//     // setRoomId(socket.id);

//     console.log('CREATE ROOM: ', socket.id);
//     console.log('CR SOCKET: ', socket);
//     sessionStorage.setItem('username', username);

//     navigate(`/karaoke/${socket.id}`);
//   };


  return (
    <div>
      <h1>Home</h1>
      {/* <Link to={`/karaoke/${roomId}`}> */}

      {console.log("SOCKET ID: ", socket.id)}

    
    
      {/* </Link> */}

      <div>
        <button onClick={handleLogin}>Log In</button>
      </div>
      {/* <button onClick={handleCreateRoom}>Create Room</button> */}
      {/* </Link> */}
      {/* <div>
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
      </div> */}
      <JoinRoom/>
    </div>
  );
};

export default Home;
