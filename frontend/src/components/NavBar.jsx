import React from "react";
import { Link } from "react-router-dom";
// Logo and user profile is also supposed to display
const Navbar = () => {
  return (
      <nav className="navigation">
        <ul>
          <li>
            <Link id="home" to="/">
              {" "}
              HOME
            </Link>
          </li>
          <li>
            <Link to="/karaoke"> KARAOKE</Link>
          </li>
        </ul>
      </nav>
  );
};

export default Navbar;