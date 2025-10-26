import { GetChats200ResponseInner } from '@/openapi/client';
import { useState } from 'react';
import ChatDetailScreen from './ChatDetailScreen';
import ChatListScreen from './ChatListScreen';

export default function MessagesScreen() {
  const [selectedChat, setSelectedChat] = useState<GetChats200ResponseInner | null>(null);

  const handleChatSelect = (chat: GetChats200ResponseInner) => {
    setSelectedChat(chat);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  if (selectedChat) {
    return <ChatDetailScreen chat={selectedChat} onBack={handleBackToList} />;
  }

  return <ChatListScreen onChatSelect={handleChatSelect} />;
}
