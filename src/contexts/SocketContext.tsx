import React, { createContext, useState, useEffect, ReactNode } from 'react';
import io from 'socket.io-client';


// Custom hook to extract the query parameter
const useUserIdFromQuery = () => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Get userId from the query string, default to '' if not present
    const params = new URLSearchParams(window.location.search);
    setUserId(params.get('userId') || '');
  }, []);

  return userId;
};

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
  const userId = useUserIdFromQuery();
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<any>(null);
  
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
      socketInstance.disconnect();
    };
  }, [userId]);

  const sendMessage = (message: string,  recipient: string) => {
    socket.emit('send_message', { content: message, sender: userId, recipient });
  };

  return (
    <SocketContext.Provider value={{ sendMessage, messages, userId }}>
      {children}
    </SocketContext.Provider>
  );
};
