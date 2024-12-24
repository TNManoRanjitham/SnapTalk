import React, { useState, useContext } from 'react';
import { SocketContext } from '../../contexts/SocketContext';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router
import './Chat.css'; // Import your CSS file here

const Chat: React.FC = () => {
  const socketContext = useContext(SocketContext);
  const navigate = useNavigate(); // For navigation
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');

  // Check if context is available
  if (!socketContext) {
    return <p>Loading...</p>;
  }

  const { sendMessage, messages, userId } = socketContext;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && recipient.trim()) {
      sendMessage(message.trim(), recipient.trim());
      setMessage(''); // Clear the input after sending
    }
  };

  const handleLogout = () => {
    // Perform any logout logic here, such as clearing tokens or session storage
    localStorage.removeItem('userId'); // Example: Clear stored userId
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Welcome, {userId}</h2>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <input
        type="text"
        placeholder="Recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
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

      <div className={messages.length === 0 ? 'no-messages' : 'messages'}>
        {messages.map((msg, index) => (
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
