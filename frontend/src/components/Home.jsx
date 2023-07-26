import React, { useContext, useState, useEffect } from 'react';
import { Navigate, redirect, useNavigate, Link } from 'react-router-dom';
import { SocketContext } from '../context';
import JoinRoom from './JoinRoom';

const Home = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  // const handleLogin = () => {
  //   navigate("/login");
  // }

  return (
    <div className='bg-primary'>
      <h1 className="text-center text-secondary">Home</h1>
      {console.log("SOCKET ID: ", socket.id)}
      {/* <div>
        <button onClick={handleLogin}>Log In</button>
      </div> */}
      <JoinRoom/>
    </div>
  );
};

export default Home;
