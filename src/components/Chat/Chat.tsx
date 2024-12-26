import React, { useState, useContext } from 'react';
import { SocketContext } from '../../contexts/SocketContext';
import { useParams, useNavigate } from 'react-router-dom'; 
import './Chat.css';
import { AuthContext } from '../../contexts/AuthContext';
import useChat from '../../hooks/useChat';
import { FiArrowLeft } from 'react-icons/fi';

const Chat: React.FC = () => {
  const { username } = useParams(); 
  
  const socketContext = useContext(SocketContext);
  useChat(username, socketContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate(); 
  const [message, setMessage] = useState('');
  const [recipient] = useState(username || '');

  if (!socketContext || !authContext) {
    return <p>Loading...</p>;
  }

  const { sendMessage, messages, userId } = socketContext;

  const filteredMessages = messages.filter(
    (msg) =>
      (msg.sender === userId && msg.recipient === recipient) ||
      (msg.sender === recipient && msg.recipient === userId)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && recipient.trim()) {
      sendMessage(message.trim(), recipient.trim());
      setMessage('');
    }
  };

  const handleLogout = () => {
    navigate('/user'); 
  };

  return (
    <div className="chat-container">
       <div className="chat-header">
        <h2>Chat with {recipient}</h2>
        <FiArrowLeft className="back-icon" onClick={handleLogout} title="Back" />
      </div>
      <textarea
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={!message.trim() || !recipient.trim()} // Disable button if inputs are empty
      >
        Send
      </button>

      <div className={filteredMessages.length === 0 ? 'no-messages' : 'messages'}>
        {filteredMessages.map((msg, index) => (
          <p
            key={index}
            className={msg.sender === userId ? 'sent' : 'received'}
          >
            <strong>{msg.sender === userId ? 'You' : msg.sender}:</strong> {msg.content}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Chat;
