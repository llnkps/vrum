import { TabButton } from '@/components/ui/button/TabButton';
import EventsScreen from '@/modules/messages/screens/EventsScreen';
import MessagesScreen from '@/modules/messages/screens/MessagesScreen';
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Messages() {
  const [tab, setTab] = useState<'messages' | 'events'>('messages');

  return (
    <>
      <SafeAreaView>
        <View className="flex-row justify-center border-b border-border dark:border-border-dark">
          <TabButton title="Messages" isSelected={tab === 'messages'} onPress={() => setTab('messages')} />
          <TabButton title="Events" isSelected={tab === 'events'} onPress={() => setTab('events')} />
        </View>
      </SafeAreaView>

      {tab === 'messages' ? <MessagesScreen /> : <EventsScreen />}
    </>
  );
}
