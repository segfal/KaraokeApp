import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../../../context';

const Participants = () => {
  const socket = useContext(SocketContext);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    // Function to handle new participants joining the room
    const handleUserConnected = (userId, name) => {
      const participantInfo = { id: userId, name: name };
      // console.log('participantInfo: ', participantInfo);
      setParticipants((prevParticipants) => [
        ...prevParticipants,
        participantInfo,
      ]);
    };

    socket.on('user-connected', handleUserConnected);

    return () => {
      socket.off('user-connected', handleUserConnected);
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
