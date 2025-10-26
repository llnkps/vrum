import { createAuthenticatedApiCall } from '@/openapi/auth-utils';
import { ChatApi } from '@/openapi/client';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useChats = () => {
  const queryClient = useQueryClient();

  const {
    data: chats = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['chats'],
    queryFn: async () => {
      const chatApi = new ChatApi(createAuthenticatedConfiguration());

      return await createAuthenticatedApiCall(async () => await chatApi.getChats());
    },
  });

  const startChatMutation = useMutation({
    mutationFn: async (userId: number) => {
      const chatApi = new ChatApi(createAuthenticatedConfiguration());
      await createAuthenticatedApiCall(async () => await chatApi.startChat({ userId }));
    },
    onSuccess: () => {
      // Invalidate and refetch chats after starting a new chat
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
  });

  const startChat = (userId: number) => {
    startChatMutation.mutate(userId);
  };

  return {
    chats,
    isLoading,
    error,
    refetch,
    startChat,
    isStartingChat: startChatMutation.isPending,
    startChatError: startChatMutation.error,
  };
};
