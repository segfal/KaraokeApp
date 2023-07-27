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
        const res = await axios.post(`http://localhost:4000/auth/logout`);
        console.log("LOGOUT RES: ", res);
        setIsAuthenticated(false);
        navigate(`/`);
    }
    catch(err){
        console.log("LOGOUT ERROR: ", err);
    }
  }

  return (
      <nav className="navigation">
        <ul style={{listStyleType: "none"}}>
          <li>
            <Link id="home" to="/">HOME</Link>
          </li>
          <li>
            {isAuthenticated && (<button onClick={handleLogout}>Log Out</button>)}
          </li>
          <li>
            {!isAuthenticated && (<Link to="/login">LOG IN</Link>)}
          </li>

          <li>
            {!isAuthenticated && (<Link to="/signup">SIGN UP</Link>)}
          </li>


          {/* <li>
            <Link to="/karaoke">KARAOKE</Link>
          </li> */}
        </ul>
      </nav>
  );
};

export default Navbar;