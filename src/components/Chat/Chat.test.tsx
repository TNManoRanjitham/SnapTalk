import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SocketContext, Message } from '../../contexts/SocketContext'; // Import context and types
import Chat from './Chat'; // Import the Chat component

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
        fetchUndeliveredMessages: jest.fn(),
        sendMessage: sendMessageMock,
        messages: [
          { content: 'Hello', sender: 'user1', recipient: 'user2', timestamp: 'now' },
        ],
        userId: 'user1',
      }}>
        <Chat />
      </SocketContext.Provider>
    );

    // Check if the initial message is rendered
    expect(screen.getByText('Hello')).toBeInTheDocument();

    // Simulate typing a message
    fireEvent.change(screen.getByPlaceholderText('Recipient'), {
      target: { value: 'user2' },
    });
    fireEvent.change(screen.getByPlaceholderText('Type a message...'), {
      target: { value: 'How are you?' },
    });

    // Simulate clicking the "Send" button
    fireEvent.click(screen.getByText('Send'));

    // Wait for DOM update after sendMessage function is called
    await waitFor(() => expect(sendMessageMock).toHaveBeenCalledWith('How are you?', 'user2'));

    // Check if message input was cleared
    expect(screen.getByPlaceholderText('Type a message...')).toHaveValue('');
  });

  test('should display multiple messages', async () => {
    const messages = [
      { content: 'Hello', sender: 'user1', recipient: 'user2', timestamp: 'now' },
      { content: 'Hi!', sender: 'user2', recipient: 'user1', timestamp: 'later' },
    ];

    render(
      <SocketContext.Provider value={{
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
        fetchUndeliveredMessages: jest.fn(),
        sendMessage: sendMessageMock,
        messages: [],
        userId: 'user1',
      }}>
        <Chat />
      </SocketContext.Provider>
    );

    // Simulate empty inputs (no recipient and no message)
    fireEvent.change(screen.getByPlaceholderText('Recipient'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Type a message...'), { target: { value: '' } });
    
    // Click the "Send" button
    fireEvent.click(screen.getByText('Send'));

    // Ensure sendMessage is NOT called with empty values
    expect(sendMessageMock).not.toHaveBeenCalled();
  });
});
