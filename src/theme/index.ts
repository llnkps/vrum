import {
  DarkTheme,
  DefaultTheme,
  Theme as NavigationTheme,
} from "@react-navigation/native";

export interface CustomTheme extends NavigationTheme {
  colors: NavigationTheme["colors"] & {
    tabBarActiveTintColor: string;
    tabBarInactiveTintColor: string;
    icon: string;

    surface: string;
    button: {
      primary: string;
      primaryPressed: string;

      subtle: string;
      subtlePressed: string;
    };
    input: {
      background: string;
      placeholderColor: string;
      borderColor: string;
    };
    border: string;
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
    icon: "#292A2E",
    surface: "#FFFFFF",

    button: {
      primary: "#bd0016",
      primaryPressed: "",

      subtle: "#00000000",
      subtlePressed: "#0B120E24",
    },

    input: {
      background: "#FFFFFF",
      placeholderColor: "#6B6E76",
      borderColor: "#8C8F97",
    },

    border: "#0B120E24",
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
    icon: "#CECFD2",
    surface: "#1F1F21",

    button: {
      primary: "#c4172b",
      primaryPressed: "",

      subtle: "#00000000",
      subtlePressed: "#E3E4F21F",
    },

    input: {
      background: "#242528",
      placeholderColor: "#96999E",
      borderColor: "#7E8188",
    },

    border: '#E3E4F21F',
  },
};
