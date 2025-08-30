import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { SocketContext } from '../context';

const Navbar = () => {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const handleHome = () => {
    navigate('/');
    if (socket) {
      socket.emit('leave_room', socket.id);
    }
  };

  return (
    <div>
      <nav className="bg-mainGreen font-montserrat font-extra-bold px-4 py-3 flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-10">
        <div className="flex items-center">
          <img src={logo} alt="Serenade" className="h-10 w-10 mr-4"></img>
          <i>
            <Link
              id="home"
              to="/"
              onClick={handleHome}
              className="text-left text-mainWhite font-extra-extrabold hover:underline mr-4"
              style={{ fontStyle: 'normal' }}>
              HOME
            </Link>
          </i>
        </div>
        <div className="flex items-center">
          <span className="text-mainWhite text-sm">
            No login required - just join a room and start singing!
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
