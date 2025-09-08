import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BlurTabBarBackground from '@/components/TabBarBackground.ios';

// https://github.com/EvanBacon/expo-router-forms-components/blob/main/components/ui/Tabs.tsx
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={
        process.env.EXPO_OS === 'ios'
          ? {
              tabBarActiveTintColor: '#0d6c9a',
              tabBarInactiveTintColor: '#8E8E93',
              headerShown: false,
              tabBarBackground: BlurTabBarBackground,
              tabBarStyle: {
                position: 'absolute',
              },
            }
          : {
              tabBarActiveTintColor: '#0d6c9a',
              tabBarInactiveTintColor: '#8E8E93',
              headerShown: false,
            }
      }>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => <Ionicons name="star" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="announcement"
        options={{
          title: 'Announcement',
          tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
