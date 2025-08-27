import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "@/src/screens/Auth/LoginScreen";
import RegisterScreen from "@/src/screens/Auth/RegisterScreen";
import CarsListScreen from "@/src/screens/Cars/CarsListScreen";
import CarDetailsScreen from "@/src/screens/Cars/CarDetailsScreen";

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
      <Stack.Screen name="CarsList" component={CarsListScreen}></Stack.Screen>
      <Stack.Screen name="CarDetails" component={CarDetailsScreen}></Stack.Screen>
    </Stack.Navigator>
  )
};

export default AppNavigator;