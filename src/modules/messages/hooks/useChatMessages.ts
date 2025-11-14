import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChatApi, SendMessageRequest, GetChats200ResponseInner } from '@/openapi/client';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';
import { createAuthenticatedApiCall } from '@/openapi/auth-utils';
import { useChatSSE } from './useChatSSE';

export const useChatMessages = (chat: GetChats200ResponseInner | null) => {
  const queryClient = useQueryClient();

  const {
    data: messages = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['chat-messages', chat?.id],
    queryFn: async () => {
      if (!chat) return [];

      const chatApi = new ChatApi(createAuthenticatedConfiguration());
      const fetchedChat = await createAuthenticatedApiCall(async () => await chatApi.getMessages({ chatId: chat.id! }));
      return fetchedChat || [];
    },
    enabled: !!chat,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!chat) throw new Error('No chat selected');
      console.log('SENDING MESSAGE:', content, chat);

      const chatApi = new ChatApi(createAuthenticatedConfiguration());
      const sendMessageRequest: SendMessageRequest = {
        content,
      };

      return await createAuthenticatedApiCall(async () => {
        console.log('INSIDE CALL BACK');
        return await chatApi.sendMessage({
          chatId: chat.id!,
          sendMessageRequest,
        });
      });
    },
    onSuccess: () => {
      // Invalidate to refetch messages and chats
      queryClient.invalidateQueries({ queryKey: ['chat-messages', chat?.id] });
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
  });

  // Handle incoming SSE messages
  const handleMessageReceived = (newMessage: any) => {
    console.log('Received new message via SSE:', newMessage);
    // Update the messages in the query cache
    queryClient.setQueryData(['chat-messages', chat?.id], (oldMessages: any[] = []) => {
      // Check if message already exists to avoid duplicates
      const exists = oldMessages.some(msg => msg.id === newMessage.id);
      if (!exists) {
        return [...oldMessages, newMessage];
      }
      return oldMessages;
    });

    // Also update the chats list to show the latest message
    queryClient.invalidateQueries({ queryKey: ['chats'] });
  };

  // Connect to SSE when chat is selected
  useChatSSE(chat?.id || null, handleMessageReceived);

  const sendMessage = (content: string) => {
    sendMessageMutation.mutate(content);
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    isSendingMessage: sendMessageMutation.isPending,
    sendMessageError: sendMessageMutation.error,
    refetch,
  };
};
