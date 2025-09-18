import { DarkTheme, DefaultTheme, Theme as NavigationTheme } from '@react-navigation/native';

export interface CustomTheme extends NavigationTheme {
  colors: NavigationTheme["colors"] & {
    tabBarActiveTintColor: string;
    tabBarInactiveTintColor: string;
    icon: string;

    surface: string;
  };
}

// for navigation elements: tab, header
export const MyLightTheme: CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
    text: "#292A2E",
    primary: "#1868DB",
    tabBarActiveTintColor: "#0d6c9a",
    tabBarInactiveTintColor: "#8E8E93",
    icon: "#CECFD2",
    surface: "#FFFFFF",
  },
};

export const MyDarkTheme: CustomTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#000",
    text: "#BFC1C4",
    primary: "#669DF1",
    tabBarActiveTintColor: "#BFC1C4",
    tabBarInactiveTintColor: "#6B6E76",
    icon: "#292A2E",
    surface: "#1F1F21",
  },
};
