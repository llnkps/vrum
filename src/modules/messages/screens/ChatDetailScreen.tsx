import { IconButton } from '@/components/ui/button/IconButton';
import { InputField } from '@/components/ui/input';
import { useChatMessages } from '@/modules/messages/hooks/useChatMessages';
import { GetChats200ResponseInner, GetMessages200ResponseInner } from '@/openapi/client';
import { CustomTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, UIManager, View } from 'react-native';

type ChatDetailScreenProps = {
  chat: GetChats200ResponseInner;
  onBack: () => void;
};

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type ChatInputProps = {
  handleSendMessage: (text: string) => void;
  isSendingMessage: boolean;
  sendMessageError: any;
  messagesLoading: boolean;
  tabBarHeight: number;
};

const ChatInput = memo<ChatInputProps>(({ handleSendMessage, isSendingMessage, sendMessageError, messagesLoading, tabBarHeight }) => {
  const [messageText, setMessageText] = useState('');

  const onSend = useCallback(() => {
    if (!messageText.trim()) return;
    handleSendMessage(messageText.trim());
    setMessageText('');
  }, [messageText, handleSendMessage]);

  return (
    <View style={{ marginBottom: tabBarHeight + 20 }} className="border-t border-border p-4 dark:border-border-dark">
      {sendMessageError && <Text className="mb-2 text-sm text-red-500">Failed to send message. Please try again.</Text>}
      <View className="flex-row items-end gap-2">
        <View className="flex-1">
          <InputField
            value={messageText}
            onChange={e => setMessageText(e)}
            placeholder="Type a message..."
            multiline
            style={{
              minHeight: 40,
              maxHeight: 100,
              paddingRight: 50,
            }}
          />
        </View>
        <IconButton
          iconName={isSendingMessage ? 'time' : 'send'}
          iconSize={18}
          appearance={messageText.trim() && !messagesLoading && !isSendingMessage ? 'primary' : 'secondary'}
          size="medium"
          loading={isSendingMessage}
          disabled={!messageText.trim() || messagesLoading}
          onPress={onSend}
        />
      </View>
    </View>
  );
});

ChatInput.displayName = 'ChatInput';

export default function ChatDetailScreen({ chat, onBack }: ChatDetailScreenProps) {
  const theme = useTheme() as CustomTheme;
  const tabBarHeight = useBottomTabBarHeight();

  const { messages, sendMessage, isLoading: messagesLoading, isSendingMessage, sendMessageError } = useChatMessages(chat);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: false }), 100);
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    });
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  // Removed useEffect for messages, using onContentSizeChange instead

  const handleSendMessage = useCallback(
    async (text: string) => {
      try {
        await sendMessage(text);
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    },
    [sendMessage]
  );

  const currentUserId = chat.user1 === 0 ? 0 : chat.user1;

  const renderMessage = useCallback(
    ({ item }: { item: GetMessages200ResponseInner }) => (
      <View className={`mb-2 max-w-[80%] rounded-lg p-3 ${item.sender === currentUserId ? 'self-end bg-blue-500' : 'self-start bg-gray-200 dark:bg-gray-700'}`}>
        <Text className={item.sender === currentUserId ? 'text-white' : 'text-font dark:text-font-dark'}>{item.content}</Text>
        <Text className={`mt-1 text-xs ${item.sender === currentUserId ? 'text-blue-100' : 'text-font-subtlest dark:text-font-subtlest-dark'}`}>
          {item.createdAt ? new Date(item.createdAt).toLocaleTimeString() : ''}
        </Text>
      </View>
    ),
    [currentUserId]
  );

  return (
    <>
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          // 👇 Adjust this to match your header + tab bar height
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 70}
        >
          <View style={{ flex: 1 }}>
            {/* Chat Header */}
            <View className="flex-row items-center border-b border-border p-4 dark:border-border-dark">
              <TouchableOpacity onPress={onBack} className="mr-3">
                <Ionicons name="arrow-back" size={24} color={theme.colors.icon} />
              </TouchableOpacity>
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                <Ionicons name="person" size={20} color={theme.colors.icon} />
              </View>
              <Text className="font-medium text-font dark:text-font-dark">User {chat.user1 === 0 ? chat.user2 : chat.user1}</Text>
            </View>

            {/* Messages */}
            <FlatList
              ref={flatListRef}
              data={messages}
              // data={messages.filter(item => item)}
              keyExtractor={item => item.id?.toString() || `message-${Math.random()}`}
              renderItem={renderMessage}
              className="flex-1 p-4"
              inverted={false}
              contentContainerStyle={{ paddingBottom: 20 }}
              onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
              // keyboardShouldPersistTaps="handled"
              // keyboardDismissMode="on-drag"
            />
            <ChatInput
              handleSendMessage={handleSendMessage}
              isSendingMessage={isSendingMessage}
              sendMessageError={sendMessageError}
              messagesLoading={messagesLoading}
              tabBarHeight={tabBarHeight}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}
