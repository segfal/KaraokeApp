import React, { useContext } from "react";
import { SocketContext } from "../../../context.tsx";
import { PeerContext } from "../../../PeerContext.tsx";
import UserVideo from "./UserVideo.jsx";

const User = () => {
    const socket = useContext(SocketContext);
    const peer = useContext(PeerContext);
    
  return (
    <UserVideo socket={socket} peer={peer} />
  )
}

export default User