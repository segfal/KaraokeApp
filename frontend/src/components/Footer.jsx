import React,{useContext, useState, useEffect} from "react";
import { Navigate, redirect, useNavigate, Link, useLocation } from 'react-router-dom';
import logo from "../assets/logo-footer.png";

const Footer = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/" || location.pathname.indexOf('/profile') > -1;
    const navigate = useNavigate();

    return (
        <footer className={`${isHomePage ? "bg-lightGreen" : "bg-mainGreen"} font-montserrat p-4 text-center shadow-md`}>
            <p className={`${isHomePage ? "text-mainGreen" : "text-lightGreen"}`}>&copy; {new Date().getFullYear()} Serenade. Your Virtual Karaoke Studio. All rights reserved.</p>
            <div className="rounded-full h-16 w-16 mx-auto my-4 overflow-hidden">
                <img src={logo} className="h-full w-full object-cover transform scale-125"></img>
            </div>
            <div className={`${isHomePage ? "text-mainGreen" : "text-lightGreen"} flex items-center justify-center text-mainGreen`}>
                <Link to="/" className={`${isHomePage ? "hover:text-black text-mainGreen" : "hover:text-mainWhite text-lightGreen"} mr-8 hover:underline`}>Home</Link>
                <Link to="/login" className={`${isHomePage ? "hover:text-black text-mainGreen" : "hover:text-mainWhite text-lightGreen"} mr-8 hover:underline`}>Log In</Link>
                <Link to="/signup" className={`${isHomePage ? "hover:text-black text-mainGreen" : "hover:text-mainWhite text-lightGreen"} hover:underline`}>Sign Up</Link>
            </div>
        </footer>
    )
}

export default Footer;