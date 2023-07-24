import React,{useState,useEffect,useContext} from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import JoinRoom from './JoinRoom';
import { SocketContext } from '../context';

const Profile = () => {
    const socket = useContext(SocketContext);
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.singleUser);
    console.log("USER INFO: ", userInfo);

    const handleLogout = async () => {
        //using try catch to handle errors
        try{
            //axios call to logout
            const res = await axios.post(`http://localhost:4100/auth/logout`);
            console.log("LOGOUT RES: ", res);
            navigate(`/`);
        }
        catch(err){
            console.log("LOGOUT ERROR: ", err);
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:4100/auth/profile`)
        .then((res) => {
            console.log("PROFILE RES: ", res);
            setFirstName(res.data.firstName);
        })
        .catch((err) => {
            console.log("PROFILE ERROR: ", err);
        })
    }, []);

    const handleCreateRoom = () => {
        socket.emit('create_room', socket.id);
        // let username = user.trim() || 'Admin';
        console.log('CREATE ROOM: ', socket.id);
        console.log('CR SOCKET: ', socket);
        // sessionStorage.setItem('username', username);

        navigate(`/karaoke/${socket.id}`);
    };

    return (
        <div>
            <h1>Profile</h1>
            <div>
                <button onClick={handleLogout}>Log Out</button>
            </div>
            <h1>Hello {userInfo.firstName}</h1>
            <button onClick={handleCreateRoom}>Create Room</button>
            <JoinRoom />
        </div>
    )
}

export default Profile;