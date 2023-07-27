import React,{useContext, useState, useEffect} from "react";
import { Navigate, redirect, useNavigate, Link } from 'react-router-dom';
import logo from "../assets/logo-footer.png";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="bg-lightGreen font-montserrat p-4 text-center">
            <p className="text-mainGreen">&copy; {new Date().getFullYear()} Serenade. Your Virtual Karaoke Studio. All rights reserved.</p>
            <img src={logo} className="rounded-full h-16 w-16 mx-auto my-4"></img>
            <div className="flex items-center justify-center text-mainGreen">
                <Link to="/" className="mr-8 hover:underline hover:text-black">Home</Link>
                <Link to="/login" className="mr-8 hover:underline hover:text-black">Log In</Link>
                <Link to="/signup" className="hover:underline hover:text-black">Sign Up</Link>
            </div>
        </footer>
    )
}

export default Footer;