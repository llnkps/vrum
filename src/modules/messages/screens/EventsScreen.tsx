import { ScrollView, Text, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EventsScreen() {
  const scheme = useColorScheme();
  const iconColor = scheme === 'dark' ? '#96999E' : '#6B6E76';

  return (
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
      <Ionicons name="newspaper-outline" size={64} color={iconColor} className="mb-4" />
      <Text className="mx-10 text-center text-font dark:text-font-subtle-dark">Следите за событиями!</Text>
    </ScrollView>
  );
}
