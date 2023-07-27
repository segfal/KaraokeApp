import React, { useContext, useState, useEffect } from 'react';
import { Navigate, redirect, useNavigate, Link } from 'react-router-dom';
import { SocketContext } from '../context';
import JoinRoom from './JoinRoom';
import logo from "../assets/logo-name.png";
const Home = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  // const handleLogin = () => {
  //   navigate("/login");
  // }

  return (
    <div className='bg-mainGreen font-montserrat h-screen'>
      <div className="text-center text-mainWhite">
        <img className="mx-auto" src={logo} alt="eKaraoke Logo"></img>
        {/* <h1 className="font-extra-extrabold text-3xl tracking-widest">SERENADE</h1> */}
        <h2 className='font-extra-bold text-lg my-14 w-1/3 mx-auto'>Sing along with friends from the comfort of your own home on this virtual karaoke platform!</h2>
      </div>
      {console.log("SOCKET ID: ", socket.id)}
      {/* <div>
        <button onClick={handleLogin}>Log In</button>
      </div> */}
      <JoinRoom/>
    </div>
  );
};

export default Home;
