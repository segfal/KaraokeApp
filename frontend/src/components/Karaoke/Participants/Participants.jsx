import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../../../context';

const Participants = () => {
  const socket = useContext(SocketContext);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const handleUserConnected = (userId, name) => {
      const participantInfo = { id: userId, name: name };
      // console.log('participantInfo: ', participantInfo);
      setParticipants((prevParticipants) => [
        ...prevParticipants,
        participantInfo,
      ]);
    };

    const handleUserDisconnected = (userId) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((participant) => participant.id !== userId)
      );
    };

    socket.on('user-connected', handleUserConnected);
    socket.on('user-disconnected', handleUserDisconnected);

    socket.on('room-created', (username) => {
      const userId = socket.id;
      const participantInfo = { id: userId, name: username };
      setParticipants((prevParticipants) => [
        ...prevParticipants,
        participantInfo,
      ]);
    });

    return () => {
      socket.off('user-connected', handleUserConnected);
      socket.off('user-disconnected', handleUserDisconnected);
      socket.off('room-created');
    };
  }, [socket]);

  return (
    <div>
      <h3>Participants</h3>
      <div>
        {participants.map((participant, index) => (
          <div key={index}>{participant.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Participants;
