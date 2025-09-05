import {SafeAreaProvider} from "react-native-safe-area-context";
import AppNavigator from "@/src/navigation/AppNavigator";
import {StatusBar} from "expo-status-bar";
import '../styles/globals.css';

export default function Index() {
  return (
    <SafeAreaProvider>
      <AppNavigator/>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}