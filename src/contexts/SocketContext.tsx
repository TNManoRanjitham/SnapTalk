import React, { createContext, useState, useEffect, ReactNode } from 'react';
import io from 'socket.io-client';

const useQuery = () => new URLSearchParams(window.location.search);
const userId = useQuery().get('userId') || ''; // Get userId from the query string, default to '' if not present

// Use the backend URL from the .env file
const socket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001', { query: { userId } }); // Backend server URL

export interface SocketContextProps {
  sendMessage: (message: string, recipient: string) => void;
  messages: Message[];
  userId: string;
}

interface SocketProviderProps {
  children: ReactNode;
}

export interface Message {
  content: string;
  sender: string;
  recipient: string;
  timestamp: string;
}

export const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('receive_message', ( message : Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = (message: string,  recipient: string) => {
    socket.emit('send_message', { content: message, sender: userId, recipient });
  };

  return (
    <SocketContext.Provider value={{ sendMessage, messages, userId }}>
      {children}
    </SocketContext.Provider>
  );
};
