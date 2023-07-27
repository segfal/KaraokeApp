import React,{useContext, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../App";
import axios from "axios";
// Logo and user profile is also supposed to display


const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    //using try catch to handle errors
    try{
        //axios call to logout
        const res = await axios.post(`http://localhost:4100/auth/logout`);
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
      <nav>
        <div className="bg-mainGreen">
          <i>
            <Link id="home" to={isAuthenticated ? "/profile" : "/"} className="text-left text-mainWhite ">HOME</Link>
          </i>
          <i>
            {isAuthenticated && (<button onClick={handleLogout} className="text-right">LOG OUT</button>)}
          </i>
          <i>
            {!isAuthenticated && (<button onClick={handleLogin} className="text-right">LOG IN</button>)}
          </i>
          <i>
            {!isAuthenticated && (<button onClick={handleSignup} className="text-right">SIGN UP</button>)}
          </i>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;