import React, { useContext, useState, useEffect } from 'react';
import { Navigate, redirect, useNavigate, Link } from 'react-router-dom';
import { SocketContext } from '../context';
import JoinRoom from './JoinRoom';
import logo from "../assets/logo-name.png";
const Home = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  
  return (
    <div className='bg-mainGreen font-montserrat h-screen pt-32'>
      <div className="text-center text-mainWhite">
        <img className="mx-auto" src={logo} alt="Serenade Logo"></img>
        <h2 className='font-extra-bold text-lg my-14 w-1/3 mx-auto'>Sing along with friends from the comfort of your own home on this virtual karaoke platform!</h2>
      </div>
      {console.log("SOCKET ID: ", socket.id)}
      <JoinRoom/>
    </div>
  );
};

export default Home;
