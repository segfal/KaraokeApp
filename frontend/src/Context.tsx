import React, { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

// const backend_url = import.meta.env.VITE_BACKEND_URL


const socket = io("https://karaoke-backend-exp-production.up.railway.app/"),
SocketContext = createContext<Socket>(socket);

socket.on('connect', () => console.log('connected to socket'));

const SocketProvider = ({ children }: any) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
export { SocketContext, SocketProvider };