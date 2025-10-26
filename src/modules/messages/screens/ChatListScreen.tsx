import { LoaderIndicator } from '@/components/global/LoaderIndicator';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { useChats } from '@/modules/messages/hooks/useChats';
import { GetChats200ResponseInner } from '@/openapi/client';
import { CustomTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { FlatList, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ChatListScreen() {
  const { chats, isLoading: chatsLoading, error: chatsError, startChat, isStartingChat, startChatError, refetch } = useChats();
  const router = useRouter();

  const theme = useTheme() as CustomTheme;

  const renderChatItem = ({ item }: { item: GetChats200ResponseInner }) => (
    <TouchableHighlightRow
      label={`User ${item.user1 === 0 ? item.user2 : item.user1}`}
      selectedValue={(item as any).messages?.[(item as any).messages.length - 1]?.content || 'No messages yet'}
      onPress={() =>
        router.push({
          pathname: '/(app)/messages/(modal)/chat-room',
          params: { chatId: item.id },
        })
      }
      variant="plain"
      showRightArrow={false}
      icon={
        <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-gray-300">
          <Ionicons name="person" size={24} color={theme.colors.icon} />
        </View>
      }
      selectedValueStyle={{ fontSize: 14 }}
      containerStyle={{
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
      }}
    />
  );

  return (
    <>
      {chatsLoading ? (
        <LoaderIndicator />
      ) : chatsError ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-500">Error loading chats</Text>
        </View>
      ) : chats.length === 0 ? (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 100,
            paddingTop: 50,
          }}
        >
          <Ionicons name="newspaper-outline" size={64} color={theme.colors.icon} className="mb-4" />
          <Text className="mx-10 mb-4 text-center text-font dark:text-font-dark">Нет сообщений</Text>
          <Text className="mx-12 text-font-subtle dark:text-font-subtle-dark">
            Общайтесь с продавцами и покупателями, уточняйте интересующую информацию о товарах и услугах.
          </Text>
          {startChatError && <Text className="mt-2 text-sm text-red-500">Failed to start chat. Please try again.</Text>}
          <TouchableOpacity
            onPress={() => startChat(1)} // Test: start chat with user 1
            disabled={isStartingChat}
            className={`mt-4 rounded-lg px-4 py-2 ${isStartingChat ? 'bg-gray-400' : 'bg-blue-500'}`}
          >
            <Text className="text-center text-white">{isStartingChat ? 'Starting Chat...' : 'Start Test Chat'}</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <FlatList
          data={chats}
          keyExtractor={item => item.id?.toString() || `chat-${Math.random()}`}
          renderItem={renderChatItem}
          className="flex-1"
          refreshControl={<RefreshControl refreshing={chatsLoading} onRefresh={refetch} />}
        />
      )}
    </>
  );
}
