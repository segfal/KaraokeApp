import React, { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../../../context';
import './ChatBox.css';

const ChatBox = ({ roomId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isChatVisible, setIsChatVisible] = useState(true);
  const socket = useContext(SocketContext);

  const toggleChatVisibility = () => {
    setIsChatVisible((prevVisible) => !prevVisible);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const username = sessionStorage.getItem('username');
      socket.emit('send_message', { message, username, roomId });
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [socket, roomId]);

  return (
    <div>
      <button onClick={toggleChatVisibility}>
        {isChatVisible ? 'Hide Chat' : 'Show Chat'}
      </button>
      {isChatVisible && (
        <div className="chatbox-container">
          <div className="message-list">
            {messages.map((msg, index) => (
              <div key={index} className="message-item">
                <strong>{msg.username}: </strong> {msg.message}
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
      )}
    </div>
  );
};

export default ChatBox;
