import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SocketContext, Message } from '../../contexts/SocketContext'; // Import context and types
import Chat from './Chat';

// Mocking SocketContext
jest.doMock('../contexts/SocketContext', () => ({
  SocketContext: React.createContext({
    sendMessage: jest.fn(),
    messages: [
      { content: 'Hello', sender: 'user1', recipient: 'user2', timestamp: 'now' },
    ] as Message[],
    userId: 'user1',
  }),
}));

describe('Chat Component', () => {
  test('should render existing messages and send a new message', async () => {
    const sendMessageMock = jest.fn();

    render(
      <SocketContext.Provider value={{
        setSelectedUser:jest.fn(),
        fetchUndeliveredMessages: jest.fn(),
        sendMessage: sendMessageMock,
        messages: [
          { content: 'Hello', sender: 'user1', recipient: 'user2', timestamp: 'now' ,_id : "676c4b3b9d2933de45edcd8c" },
        ],
        userId: 'user1',
      }}>
        <Chat />
      </SocketContext.Provider>
    );

    expect(screen.getByText('Hello')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Recipient'), {
      target: { value: 'user2' },
    });
    fireEvent.change(screen.getByPlaceholderText('Type a message...'), {
      target: { value: 'How are you?' },
    });

    fireEvent.click(screen.getByText('Send'));

    await waitFor(() => expect(sendMessageMock).toHaveBeenCalledWith('How are you?', 'user2'));

    expect(screen.getByPlaceholderText('Type a message...')).toHaveValue('');
  });

  test('should display multiple messages', async () => {
    const messages = [
      { content: 'Hello', sender: 'user1', recipient: 'user2', timestamp: 'now', _id : "676c4b3b9da933dee5edcd8c" },
      { content: 'Hi!', sender: 'user2', recipient: 'user1', timestamp: 'later' , _id : "676c4b3b9d2933dee5edcd8c"},
    ];

    render(
      <SocketContext.Provider value={{
        setSelectedUser:jest.fn(),
        fetchUndeliveredMessages: jest.fn(),
        sendMessage: jest.fn(),
        messages,
        userId: 'user1',
      }}>
        <Chat />
      </SocketContext.Provider>
    );

    // Check if both messages are rendered
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi!')).toBeInTheDocument();
  });

  test('should handle empty recipient and message input', async () => {
    const sendMessageMock = jest.fn();

    render(
      <SocketContext.Provider value={{
        setSelectedUser:jest.fn(),
        fetchUndeliveredMessages: jest.fn(),
        sendMessage: sendMessageMock,
        messages: [],
        userId: 'user1',
      }}>
        <Chat />
      </SocketContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Recipient'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Type a message...'), { target: { value: '' } });
    
    fireEvent.click(screen.getByText('Send'));

    expect(sendMessageMock).not.toHaveBeenCalled();
  });
});
