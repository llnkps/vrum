import { Tabs } from "expo-router";

import BlurTabBarBackground from "@/components/TabBarBackground.ios";
import { CustomTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

// https://github.com/EvanBacon/expo-router-forms-components/blob/main/components/ui/Tabs.tsx
export default function TabLayout() {
  const theme = useTheme() as CustomTheme;
  return (
    <Tabs
      screenOptions={
        process.env.EXPO_OS === "ios"
          ? {
              tabBarActiveTintColor: "#0d6c9a",
              tabBarInactiveTintColor: "#8E8E93",
              headerShown: false,
              tabBarBackground: BlurTabBarBackground,
              tabBarStyle: {
                position: "absolute",
              },
            }
          : {
              // tabBarActiveTintColor: theme.colors.tabBarActiveTintColor,
              // tabBarInactiveTintColor: theme.colors.tabBarInactiveTintColor,
              headerShown: false,
              tabBarStyle: {
                backgroundColor: theme.colors.surface,
              },
            }
      }
    >
      <Tabs.Screen
        name="search-tab"
        options={{
          tabBarLabel: "поиск",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-sharp" size={size} color={color} />
          ),
        }}
      />


      {/* <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      /> */}

      <Tabs.Screen
        name="favorites"
        options={{
          title: "подписки",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="advertisement"
        options={{
          title: 'New ads',
          tabBarIcon: ({ color, size }) => <Ionicons name="duplicate" size={size} color={color} />,

        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "сообщения",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
