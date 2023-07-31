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
    <div className="bg-mainGreen font-montserrat min-h-screen pt-32">
    <div className="text-center text-mainWhite">
      <img className="mx-auto w-48" src={logo} alt="Serenade Logo" />
      <h2 className="font-extra-bold text-lg my-8 sm:w-2/3 mx-auto">
        Sing along with friends from the comfort of your own home on this virtual karaoke platform!
      </h2>
    </div>
    {console.log("SOCKET ID: ", socket.id)}
    <div className="flex flex-col justify-center items-center font-montserrat rounded-lg p-4 shadow w-4/5 sm:w-1/2 mx-auto mt-10">
      <JoinRoom />
    </div>
  </div>
  
  );
};

export default Home;
