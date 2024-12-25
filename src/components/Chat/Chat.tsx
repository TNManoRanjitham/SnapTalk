import React, { useState, useContext } from 'react';
import { SocketContext } from '../../contexts/SocketContext';
import { useParams, useNavigate } from 'react-router-dom'; // Assuming you're using react-router
import './Chat.css'; // Import your CSS file here
import { AuthContext } from '../../contexts/AuthContext';
import useChat from '../../hooks/useChat';
import { FiArrowLeft } from 'react-icons/fi';

const Chat: React.FC = () => {
  const { username } = useParams(); // Get the 'username' from the URL params
  
  const socketContext = useContext(SocketContext);
  useChat(username, socketContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate(); // For navigation
  const [message, setMessage] = useState('');
  const [recipient] = useState(username || '');

  // Check if context is available
  if (!socketContext || !authContext) {
    return <p>Loading...</p>;
  }

  const { sendMessage, messages, userId } = socketContext;

  // Filter messages specific to the current chat
  const filteredMessages = messages.filter(
    (msg) =>
      (msg.sender === userId && msg.recipient === recipient) ||
      (msg.sender === recipient && msg.recipient === userId)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && recipient.trim()) {
      sendMessage(message.trim(), recipient.trim());
      setMessage(''); // Clear the input after sending
    }
  };

  const handleLogout = () => {
    navigate('/user'); // Redirect to login page
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
            className={msg.sender === userId ? 'sent' : 'received'} // Apply conditional classes based on sender
          >
            <strong>{msg.sender === userId ? 'You' : msg.sender}:</strong> {msg.content}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Chat;
