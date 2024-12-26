import { useEffect } from 'react';

const useChat = (username: string | undefined, socketContext: any) => {
  useEffect(() => {
    if (username && socketContext) {
      socketContext.setSelectedUser(username);
      socketContext.fetchUndeliveredMessages(username);
    }
  }, [username]);
};

export default useChat;
