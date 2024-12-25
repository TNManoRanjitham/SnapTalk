import React, { createContext, useState, useEffect, ReactNode, useRef } from 'react';
import io from 'socket.io-client';

export interface SocketContextProps {
  sendMessage: (message: string, recipient: string) => void;
  fetchUndeliveredMessages: (recipient: string) => void; 
  messages: Message[];
  userId: string;
  setSelectedUser: (user: string) => void;
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
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  console.log(selectedUser);
 // Create a ref to always hold the latest selectedUser
 const selectedUserRef = useRef<string | null>(selectedUser);

 // Update the ref whenever selectedUser changes
 useEffect(() => {
   selectedUserRef.current = selectedUser;
 }, [selectedUser]);

  // Retrieve userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedDeviceId = localStorage.getItem('deviceId');
    if (storedUserId) {
      setUserId(storedUserId);  
    } else {
      console.warn('User ID not found in localStorage.');
    }
    if (storedDeviceId) {
      setDeviceId(storedDeviceId);
    } else {
      console.warn('Device ID not found in localStorage.');
    }
  }, []);

  // Initialize socket connection when userId is available
  useEffect(() => {
    if (!userId || !deviceId) return;

    const socketInstance = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001', {
      query: { userId , deviceId},
    });

    if (socketInstance) {
      setSocket(socketInstance);

      socketInstance.on('receive_message', (message: Message) => {
        console.log(message);
        console.log(selectedUserRef.current);
        console.log(message.recipient);
        console.log(message.sender);
        if (selectedUser && (message.sender === selectedUser || message.recipient === selectedUser)) {
        setMessages((prevMessages) => [...prevMessages, message]);
        }
      });
    }

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [userId, deviceId, selectedUser]);

  const sendMessage = (message: string, recipient: string) => {
    if (socket && deviceId) {
      socket.emit('send_message', { content: message, sender: userId, recipient, deviceId });
    } else {
      console.error('Socket connection or deviceId not available.');
    }
  };

   // Fetch undelivered messages for a selected user
   const fetchUndeliveredMessages = (recipient: string) => {
    if (socket && recipient) {
      console.log("*****Fetch Undeleivered Messages");
      socket.emit('fetch_undelivered_messages', { recipient, loggedUserId: userId });
    } else {
      console.error('Socket connection or recipient not available.');
    }
  };

  return (
    <SocketContext.Provider value={{ sendMessage, fetchUndeliveredMessages, messages, userId: userId || '' , setSelectedUser}}>
      {children}
    </SocketContext.Provider>
  );
};
