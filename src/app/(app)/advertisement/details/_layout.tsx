import { SimpleAutoFormProvider } from '@/modules/advertisement/simple-auto/SimpleAutoFormProvider';
import { Stack } from 'expo-router';

export default function ModalsLayout() {
  return (
    <SimpleAutoFormProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </SimpleAutoFormProvider>
  );
}
