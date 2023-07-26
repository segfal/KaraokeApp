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
        <div className="fixed top-0 left-0 text-right bg-green-500">
          <i>
            <Link id="home" to={isAuthenticated ? "/profile" : "/"} className="text-none">HOME</Link>
          </i>
          <i>
            {isAuthenticated && (<button onClick={handleLogout}>LOG OUT</button>)}
          </i>
          <i>
            {!isAuthenticated && (<button onClick={handleLogin}>LOG IN</button>)}
          </i>
          {/* <li>
            {!isAuthenticated && (<Link to="/login">LOG IN</Link>)}
          </li> */}

          <i>
            {!isAuthenticated && (<button onClick={handleSignup}>SIGN UP</button>)}
          </i>


          {/* <li>
            <Link to="/karaoke">KARAOKE</Link>
          </li> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;