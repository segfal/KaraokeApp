import React, { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../../../context';

const ChatBox = ({ roomId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = useContext(SocketContext);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('send_message', { message, roomId });
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={message}
          placeholder="Type message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
