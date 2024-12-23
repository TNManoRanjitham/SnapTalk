import React, { useState, useContext } from 'react';
import { SocketContext } from '../contexts/SocketContext';
import './Chat.css'; // Import your CSS file here

const Chat: React.FC = () => {
  const { sendMessage, messages, userId } = useContext(SocketContext)!;
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(message !== '')
    {
      sendMessage(message, recipient);
    }
    setMessage('');
  };

  return (
    <div className="chat-container">
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
      <button onClick={handleSubmit}>Send</button>

      <div className="messages">
        {messages.map((msg, index) => (
          <p
            key={index}
            className={msg.sender === userId ? 'sent' : 'received'} // Apply conditional classes based on sender
          >
            {msg.content}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Chat;
