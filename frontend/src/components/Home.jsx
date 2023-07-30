import React, { useContext, useState, useEffect } from 'react';
import { Navigate, redirect, useNavigate, Link } from 'react-router-dom';
import { SocketContext } from '../context';
import JoinRoom from './JoinRoom';
import logo from "../assets/logo-name.png";
const Home = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const mediaStream = navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  return (
    <div className='bg-mainGreen font-montserrat h-screen pt-32'>
      <div className="text-center text-mainWhite">
        <img className="mx-auto" src={logo} alt="Serenade Logo"></img>
        <h2 className='font-extra-bold text-lg my-14 w-1/3 mx-auto'>Sing along with friends from the comfort of your own home on this virtual karaoke platform!</h2>
      </div>
      {console.log("SOCKET ID: ", socket.id)}
      <div className='flex flex-col justify-center items-center font-montserrat rounded-lg p-4 shadow w-1/2 mx-auto mt-20'>
        <JoinRoom/>
      </div>
    </div>
  );
};

export default Home;
