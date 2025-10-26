import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function MessageLayout() {
  const router = useRouter();

  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
