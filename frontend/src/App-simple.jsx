import React, { useState, useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Room from './components/Karaoke/Room/Room';
import { SocketProvider } from './context';
import { PeerProvider } from './PeerContext';
import './index.css';
import SimpleHome from './components/SimpleHome';

function App() {
  return (
    <SocketProvider>
      <PeerProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SimpleHome />} />
            <Route path="/karaoke/:id" element={<Room />} />
          </Routes>
        </Router>
      </PeerProvider>
    </SocketProvider>
  );
}

export default App;
