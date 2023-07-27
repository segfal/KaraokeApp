import React,{useContext, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../App";
import axios from "axios";
import logo from "../assets/logo.png"
// Logo and user profile is also supposed to display


const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    //using try catch to handle errors
    try{
        //axios call to logout
        const res = await axios.post(`http://localhost:4000/auth/logout`);
        console.log("LOGOUT RES: ", res);
        setIsAuthenticated(false);
        navigate(`/`);
    }
    catch(err){
        console.log("LOGOUT ERROR: ", err);
    }
  }

  const handleLogin = () => {
    navigate("/login");
  }

  const handleSignup = () => {
    navigate("/signup");
  }

  return (
    <div>
      <nav className="bg-mainGreen font-montserrat font-extra-bold p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="eKaraoke" className="h-10 w-10 mr-4"></img>
          <i>
            <Link id="home" to={isAuthenticated ? "/profile" : "/"} className="text-left text-mainWhite font-extra-extrabold hover:underline mr-4" style={{fontStyle:"normal"}}>HOME</Link>
          </i>
        </div>
        <div>
          <i>
            {isAuthenticated && (<button onClick={handleLogout} className="text-right font-extra-extrabold  hover:underline text-mainWhite p-2">LOG OUT</button>)}
          </i>
        </div>
        <div>
          <i>
            {!isAuthenticated && (<button onClick={handleLogin} className="text-right font-extra-extrabold  hover:underline text-mainWhite p-2 mr-4">LOG IN</button>)}
          </i>
          <i>
            {!isAuthenticated && (<button onClick={handleSignup} className="text-right font-extra-extrabold bg-mainYellow rounded-md hover:bg-mainWhite transition-colors duration-200 ease-in-out p-2">SIGN UP</button>)}
          </i>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;