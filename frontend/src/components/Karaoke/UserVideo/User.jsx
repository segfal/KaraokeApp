import React, { useContext } from "react";
import { SocketContext } from "../../../context.tsx";
import UserVideo from "./UserVideo.jsx";

const User = () => {
    const socket = useContext(SocketContext);
    
  return (
    <UserVideo socket={socket} />
  )
}

export default User
