import { ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Page = () => {
  const [tab, setTab] = useState<'messages' | 'events'>('messages');
  const scheme = useColorScheme();

  const iconColor = scheme === 'dark' ? '#96999E' : '#6B6E76';

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <View className="flex-row justify-center border-b border-border dark:border-border-dark">
          <TouchableOpacity
            className={`flex-1 py-2 
            ${
              tab === 'messages'
                ? 'border-b-2 border-border-selected dark:border-border-selected-dark'
                : ''
            }`}
            onPress={() => setTab('messages')}
          >
            <Text
              className={`text-center font-medium ${
                tab === 'messages'
                  ? 'text-font-selected dark:text-font-selected-dark'
                  : 'text-font-subtle dark:text-font-subtle-dark'
              }`}
            >
              Сообщения
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-2 
            ${
              tab === 'events'
                ? 'border-b-2 border-border-selected dark:border-border-selected-dark'
                : ''
            }`}
            onPress={() => setTab('events')}
          >
            <Text
              className={`text-center font-medium ${
                tab === 'events'
                  ? 'text-font-selected dark:text-font-selected-dark'
                  : 'text-font-subtle dark:text-font-subtle-dark'
              }`}
            >
              События
            </Text>
          </TouchableOpacity>
        </View>

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
          {tab === 'messages' ? (
            <>
              <Ionicons name="newspaper-outline" size={64} color={iconColor} className="mb-4" />
              <Text className="mx-10 mb-4 text-center text-font dark:text-font-dark">
                Нет сообщений
              </Text>
              <Text className="mx-12 text-font-subtle dark:text-font-subtle-dark">
                Общайтесь с продавцами и покупателями, уточняйте интересующую информацию о товарах и
                услугах.
              </Text>
            </>
          ) : (
            <>
              <Ionicons name="newspaper-outline" size={64} color={iconColor} className="mb-4" />
              <Text className="mx-10 text-center text-font dark:text-font-subtle-dark">
                Следите за событиями!
              </Text>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Page;
