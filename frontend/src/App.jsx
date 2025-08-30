import React, { useState, useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/NavBar';
import Home from './components/Home';
import './App.css';
import Room from './components/Karaoke/Room/Room';
import Profile from './components/Profile';
import { SocketProvider } from './context';
import './index.css';
import Footer from './components/Footer';

function App() {
  return (
    <SocketProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/karaoke/:id" element={<Room />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </SocketProvider>
  );
}

export default App;
