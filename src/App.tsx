import React from 'react';
import './App.css';
import Chat from './components/Chat';
import { SocketProvider } from './contexts/SocketContext';

const App: React.FC = () => {
  return (
    <SocketProvider>
      <div className="App">
        <h1>SnapTalk</h1>
        <Chat />
      </div>
    </SocketProvider>
  );
};

export default App;
