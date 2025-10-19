import React from 'react';
import {Tabs} from 'expo-router';
import BlurTabBarBackground from '@/components/TabBarBackground.ios';
import {CustomTheme} from '@/theme';
import {Ionicons} from '@expo/vector-icons';
import {useTheme} from '@react-navigation/native';
import {Platform} from "react-native";

export default function TabLayout() {
  const theme = useTheme() as CustomTheme;
  return (
    <Tabs
      initialRouteName="search-tab"
      sceneContainerStyle={{ paddingBottom: 0 }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.tabBarActiveTintColor,
        tabBarInactiveTintColor: theme.colors.tabBarInactiveTintColor,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
          letterSpacing: 0.2,
        },
        tabBarStyle: {
          position: 'absolute',
          left: 8,
          right: 0,
          // bottom: Platform.OS === 'ios' ? 12 : 8,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 24 : 30, // TODO: DOES IT WORK?
          paddingTop: 4,
          paddingHorizontal: 8,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          elevation: 9999,
          zIndex: 9999,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: -4},
          shadowRadius: 12,
          overflow: 'visible',
          backgroundColor: Platform.OS === 'ios' ? 'transparent' : theme.colors.background,
          tabBarIconStyle: { marginTop: 2 },
        },
        ...(Platform.OS === 'ios' && { tabBarBackground: () => <BlurTabBarBackground /> }),
      }}
    >
      <Tabs.Screen
        name='search-tab'
        options={{
          tabBarLabel: 'Поиск',
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name='search'
              size={size + 2}
              color={color}/>
          ),
        }}
      />

      <Tabs.Screen
        name='favorites'
        options={{
          title: 'Избранное',
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name='star'
              size={size + 2}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='advertisement'
        options={{
          title: 'Разместить',
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name='duplicate'
              size={size + 2}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='messages'
        options={{
          title: 'Сообщения',
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name='chatbubbles'
              size={size + 2}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Профиль',
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name='person-circle'
              size={size + 2}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
