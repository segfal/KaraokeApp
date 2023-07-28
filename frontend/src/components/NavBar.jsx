import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../App';
import axios from 'axios';
import logo from '../assets/logo.png';
// Logo and user profile is also supposed to display

const Navbar = ({ userId }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    //using try catch to handle errors
    try {
      //axios call to logout
      const res = await axios.post(
        `http://https://karaoke-backend-exp-production.up.railway.app/auth/logout`
      );
      console.log('LOGOUT RES: ', res);
      setIsAuthenticated(false);
      navigate(`/`);
    } catch (err) {
      console.log('LOGOUT ERROR: ', err);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div>
      <nav className="bg-mainGreen font-montserrat font-extra-bold px-4 py-3 flex justify-between items-center shadow-md fixed top-0 left-0 w-full">
        <div className="flex items-center">
          <img src={logo} alt="Serenade" className="h-10 w-10 mr-4"></img>
          <i>
            <Link
              id="home"
              to={isAuthenticated ? `/profile/${userId}` : '/'}
              className="text-left text-mainWhite font-extra-extrabold hover:underline mr-4"
              style={{ fontStyle: 'normal' }}>
              HOME
            </Link>
          </i>
        </div>
        <div className="flex items-center">
          {isAuthenticated && (
            <i>
              <button
                onClick={handleLogout}
                className="text-right font-extra-extrabold  hover:underline text-mainWhite p-2">
                LOG OUT
              </button>
            </i>
          )}
          {!isAuthenticated && (
            <>
              <i>
                <button
                  onClick={handleLogin}
                  className="text-right font-extra-extrabold hover:underline text-mainWhite p-2 mr-4">
                  LOG IN
                </button>
              </i>
              <i>
                <button
                  onClick={handleSignup}
                  className="text-right font-extra-extrabold bg-mainYellow rounded-md hover:bg-mainWhite transition-colors duration-200 ease-in-out p-2">
                  SIGN UP
                </button>
              </i>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
