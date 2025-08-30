import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../../../context';

const Participants = () => {
  const socket = useContext(SocketContext);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const handleUserConnected = (userId, name) => {
      const participantInfo = { id: userId, name: name };
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

    const handleExistingParticipants = (existingParticipants) => {
      setParticipants(existingParticipants);
    };

    socket.on('existing-participants', handleExistingParticipants);
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
      socket.off('existing-participants', handleExistingParticipants);
    };
  }, [socket]);

  return (
    <div>
      <div className='border border-gray-300 p-[10px] w-[300px] m-[10px] h-[150px] overflow-y-auto'>
          {participants.map((participant, index) => (
            <div key={index} className="text-left">{participant.name}</div>
          ))}
      </div>
    </div>
  );
};

export default Participants;
