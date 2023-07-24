import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
    // const navigate = useNavigate();

    // useEffect = () => {

    // }

    const handleLogout = () => {
        axios.post(`http://127.0.0.1:4100/auth/logout`);
    }

    const handleCreateRoom = () => {
        // socket.emit('createRoom', socket.id);
        console.log("CREATE ROOM: ", socket.id);
        console.log("CR SOCKET: ", socket)
        // navigate(`/karaoke/${socket.id}`);
    }

    return (
        <div>
            <h1>Profile</h1>
            <div>
                <button onClick={handleLogout}>Log Out</button>
            </div>
            <button onClick={handleCreateRoom}>Create Room</button>
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
        </div>
    )
}

export default Profile;