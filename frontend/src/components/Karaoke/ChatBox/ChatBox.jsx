import React, { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../../../context';
import './ChatBox.css';

const ChatBox = ({ roomId, messages, setMessages }) => {
  const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState([]);
  const socket = useContext(SocketContext);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('send_message', { message, roomId });
      setMessage('');
    }
  };

  //   useEffect(() => {
  //     socket.on('receive_message', (data) => {
  //       setMessages((prevMessages) => [...prevMessages, data.message]);
  //     });

  //     return () => {
  //       socket.off('receive_message');
  //     };
  //   }, [roomId, setMessages]);

  return (
    <div className="chatbox-container">
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className="message-item">
            {msg}
          </div>
        ))}
      </div>
      <div className="message-input">
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
