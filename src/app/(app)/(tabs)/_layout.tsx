import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '@/state/theme/useThemeStore';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {
  const { isDark } = useThemeStore();
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();
  const backgroundColor = isDark ? '#000' : '#fff';
  const tabBarActiveTintColor = isDark ? '#BFC1C4' : '#292A2E';
  const tabBarInactiveTintColor = isDark ? '#666' : '#999';

    console.log('TabLayout - isAuthenticated:', isAuthenticated, 'isLoading:', isLoading);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarStyle: {
          position: 'absolute',
          left: 8,
          right: 0,
          bottom: Platform.OS === 'ios' ? 12 : 16,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 24 : 20,
          paddingTop: 4,
          paddingHorizontal: 8,
          borderTopWidth: 1,
          backgroundColor,
          borderTopColor: isDark ? '#333' : '#e0e0e0',
          elevation: 9999,
          zIndex: 9999,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowRadius: 12,
          overflow: 'visible',
        },
        tabBarIconStyle: { marginTop: 2 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="search-tab"
        options={{
          tabBarLabel: 'Поиск',
          tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size + 2} color={color} />,
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Избранное',
          tabBarIcon: ({ color, size }) => <Ionicons name="star" size={size + 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="advertisement"
        options={{
          title: 'Добавить',
          tabBarIcon: ({ color, size }) => <Ionicons name="duplicate" size={size + 2} color={color} />,
        }}
        listeners={{
          tabPress: e => {
            console.log('isAuthenticated', isAuthenticated, 'isLoading', isLoading);
            if (!isAuthenticated && !isLoading) {
              e.preventDefault();
              router.push('/sign-in');
            }
          },
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Сообщения',
          tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles" size={size + 2} color={color} />,
        }}
        listeners={{
          tabPress: e => {
            if (!isAuthenticated && !isLoading) {
              e.preventDefault();
              router.push('/sign-in');
            }
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle" size={size + 2} color={color} />,
        }}
      />
    </Tabs>
  );
}
