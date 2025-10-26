import { useEffect, useRef, useCallback } from 'react';
import { ChatApi, DefaultConfig } from '@/openapi/client';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';
import { createAuthenticatedApiCall } from '@/openapi/auth-utils';
import EventSource from 'react-native-sse';

export const useChatSSE = (chatId: number | null, onMessageReceived: (message: any) => void) => {
  const eventSourceRef = useRef<EventSource | null>(null);

  const connectSSE = useCallback(async () => {
    if (!chatId) return;

    try {
      // Close existing connection
      disconnectSSE();

      console.log('Connecting to SSE for chat:', chatId);

      // Get subscription info from API
      const chatApi = new ChatApi(createAuthenticatedConfiguration());
      const subscriptionInfo = await createAuthenticatedApiCall(async () =>
        await chatApi.getChatSubscriptionInfo({ chatId })
      );

      console.log('Subscription info:', subscriptionInfo);

      if (!subscriptionInfo.mercureUrl || !subscriptionInfo.topic) {
        console.error('Missing mercureUrl or topic in subscription info');
        return;
      }

      // Get auth token for headers
      const config = createAuthenticatedConfiguration();
      let authToken = '';
      if (config && config.accessToken) {
        const token = config.accessToken;
        authToken = await token("Bearer", []);
      }


      const merucureUrl = DefaultConfig.basePath + '/.well-known/mercure';

      // Create EventSource connection to Mercure hub with topic subscription
      const mercureUrlWithTopic = `${merucureUrl}?topic=${encodeURIComponent(subscriptionInfo.topic)}`;
      console.log('Connecting to Mercure URL:', mercureUrlWithTopic);
      const eventSource = new EventSource(mercureUrlWithTopic, {
        // headers: {
          // 'Authorization': `Bearer ${authToken}`,
        // },
      });

      eventSourceRef.current = eventSource;

      // Listen for messages
      eventSource.addEventListener('message', (event: any) => {
        try {
          if (event.data) {
            const data = JSON.parse(event.data);
            console.log('Received SSE message:', data);
            onMessageReceived(data);
          }
        } catch (parseError) {
          console.error('Failed to parse SSE message:', parseError);
        }
      });

      // Handle connection open
      eventSource.addEventListener('open', () => {
        console.log('SSE connection opened for chat:', chatId);
      });

      // Handle connection errors
      eventSource.addEventListener('error', (error) => {
        console.error('SSE connection error:', error);
        // Attempt to reconnect after a delay
        setTimeout(() => connectSSE(), 5000);
      });

      // Handle connection close
      eventSource.addEventListener('close', () => {
        console.log('SSE connection closed for chat:', chatId);
      });

    } catch (error) {
      console.error('Failed to connect to SSE:', error);
      // Retry connection after delay
      setTimeout(() => connectSSE(), 5000);
    }
  }, [chatId, onMessageReceived]);

  const disconnectSSE = useCallback(() => {
    if (eventSourceRef.current) {
      console.log('Disconnecting SSE');
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (chatId) {
      connectSSE();
    } else {
      disconnectSSE();
    }

    return () => {
      disconnectSSE();
    };
  }, [chatId, connectSSE, disconnectSSE]);

  return {
    connectSSE,
    disconnectSSE,
  };
};