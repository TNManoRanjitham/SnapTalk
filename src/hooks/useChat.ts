import { useEffect } from 'react';

const useChat = (username: string | undefined, socketContext: any) => {
  useEffect(() => {
    if (username && socketContext) {// Update recipient
      socketContext.setSelectedUser(username); // Set selected user in context
      socketContext.fetchUndeliveredMessages(username); // Fetch undelivered messages for this user
    }
  }, [username]);
};

export default useChat;
