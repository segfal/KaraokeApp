import React, { createContext, useContext } from 'react';
import {Peer} from 'peerjs'
// import { Socket } from 'socket.io-client';
// import { SocketContext } from './Context';




const peer = new Peer();

const PeerContext = createContext<Peer>(peer);

const PeerProvider = ({ children }: any) => {
  return (
    <PeerContext.Provider value={peer}>{children}</PeerContext.Provider>
  );
};
export { PeerContext, PeerProvider };