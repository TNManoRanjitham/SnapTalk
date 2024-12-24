import React, { createContext, useState, useEffect, ReactNode } from 'react';
import io from 'socket.io-client';

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
  const [userId, setUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<any>(null);

  // Retrieve userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.warn('User ID not found in localStorage.');
    }
  }, []);

  // Initialize socket connection when userId is available
  useEffect(() => {
    if (!userId) return;

    const socketInstance = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001', {
      query: { userId },
    });

    if (socketInstance) {
      setSocket(socketInstance);

      socketInstance.on('receive_message', (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [userId]);

  const sendMessage = (message: string, recipient: string) => {
    if (socket) {
      socket.emit('send_message', { content: message, sender: userId, recipient });
    } else {
      console.error('Socket connection not established.');
    }
  };

  return (
    <SocketContext.Provider value={{ sendMessage, messages, userId: userId || '' }}>
      {children}
    </SocketContext.Provider>
  );
};
