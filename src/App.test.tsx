import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { SocketProvider } from './contexts/SocketContext';

// Mock the Chat component as it's tightly coupled with socket functionality
jest.mock('./components/Chat', () => () => <div>Mocked Chat Component</div>);

describe('App Component', () => {
  test('renders the App component with SocketProvider and Chat', () => {
    render(
      <SocketProvider>
        <App />
      </SocketProvider>
    );

    // Check if the SnapTalk header is rendered
    const headerElement = screen.getByText(/SnapTalk/i);
    expect(headerElement).toBeInTheDocument();

    // Check if the mocked Chat component is rendered
    const chatComponent = screen.getByText(/Mocked Chat Component/i);
    expect(chatComponent).toBeInTheDocument();
  });

  test('renders Chat component inside SocketProvider', () => {
    render(
      <SocketProvider>
        <App />
      </SocketProvider>
    );

    // Make sure that the SocketProvider context is being passed down
    const chatComponent = screen.getByText(/Mocked Chat Component/i);
    expect(chatComponent).toBeInTheDocument();
  });
});
