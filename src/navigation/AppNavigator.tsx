import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "@/src/screens/Auth/LoginScreen";
import RegisterScreen from "@/src/screens/Auth/RegisterScreen";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  CarsList: undefined;
  CarDetails: { id: string };
  PartsList: undefined;
  ForumList: undefined;
  ForumThread: { id: string };
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
      <Stack.Screen name="Register" component={RegisterScreen}></Stack.Screen>
    </Stack.Navigator>
  )
};

export default AppNavigator;