import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import JoinRoom from './JoinRoom';
import { SocketContext } from '../context';
import moment from "moment";

const Profile = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.singleUser);
  const [firstName, setFirstName] = useState('');
  console.log('USER INFO: ', userInfo);

  useEffect(() => {
    axios
      .get(`https://karaoke-backend-exp-production.up.railway.app/auth/profile`)
      .then((res) => {
        console.log('PROFILE RES: ', res);
        setFirstName(res.data.firstName);
      })
      .catch((err) => {
        console.log('PROFILE ERROR: ', err);
      });
  }, []);

  const handleCreateRoom = () => {
   
    let username = userInfo.firstName + ' (Admin)';
    socket.emit('create_room', socket.id, username);
    // let username = userInfo.firstName + ' (Admin)';
    console.log('CREATE ROOM: ', socket.id);
    console.log('CR SOCKET: ', socket);
    sessionStorage.setItem('username', username);

    navigate(`/karaoke/${socket.id}`);
  };

  return (
    <div className='bg-mainGreen font-montserrat h-screen pt-15 flex items-center justify-center'>
      <div className='mb-80'>
        <h1 className='font-extra-extrabold text-3xl mb-4 text-mainWhite'>Hello {userInfo.firstName}!</h1>
        <div className='flex items-center justify-center -ml-4 text-mainWhite'>
          <div className="w-24 h-24 rounded-full overflow-hidden m-2">
            <img src={userInfo.profilePic} alt="profile pic" className="object-cover w-full h-full" />
          </div>
          <div>
            <h2 className='font-extra-extrabold uppercase text-lg'>{userInfo.firstName} {userInfo.lastName}</h2>
            <h2>{userInfo.email}</h2>
          </div>
        </div>
        <div>
          <p className='text-mainWhite mt-2 ml-6'>Serenading since: {moment(userInfo.createdAt).format("MMMM Do, YYYY")}</p>
        </div>
      </div>
      <div className='ml-20'>
        <h1 className='text-center text-2xl text-mainWhite'>Ready to start serenading? ♫</h1>
        <div>
          <div className='flex flex-col justify-center items-center font-montserrat rounded-lg p-4 shadow w-1/2 mx-auto mt-10'>
            <p className='text-mainWhite text-center text-bold'>Start a room below with a shareable Room ID your friends can use to join.</p>
            <button onClick={handleCreateRoom} className="font-extra-extrabold bg-mainYellow rounded-md hover:bg-mainWhite transition-colors duration-200 ease-in-out p-2 mt-4 uppercase">Create Room</button>
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
