import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/NavBar';
import Home from './components/Home';
import './App.css'
import Room from './components/Karaoke/Room/Room';
import Login from "./components/Login";
import Signup from './components/Signup';
import Profile from './components/Profile';
import {SocketProvider} from "./context";

/*
Later on add user auth to affect those routes

If you are not signed up as a user then clicking on "KARAOKE" would redirect you to 
a signup page. Protected routes etc.
*/
function App() {
  return (
    <SocketProvider>
      <Router>
      <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/karaoke/:id" element={<Room/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile/:id" element={<Profile/>}></Route>
      </Routes>
      </>
    </Router>
    </SocketProvider>
    
  )
}

export default App
