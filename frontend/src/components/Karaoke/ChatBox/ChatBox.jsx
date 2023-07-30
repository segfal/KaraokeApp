import React, { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../../../context';
import './ChatBox.css';

const ChatBox = ({ roomId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = useContext(SocketContext);

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
        <div className="border border-gray-300 p-[10px] w-[300px] m-[10px] h-[110px] overflow-y-auto">
          <div className="message-list">
            {messages.map((msg, index) => (
              <div key={index} className="message-item">
                <strong>{msg.username}: </strong> 
                <div className='overflow-x-auto'>{msg.message}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="message-input m-[10px]">
          <input
            type="text"
            value={message}
            placeholder="Type message..."
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage} className="rounded">Send</button>
        </div>
    </div>
  );
};

export default ChatBox;
