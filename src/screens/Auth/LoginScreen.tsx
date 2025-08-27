import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/src/navigation/AppNavigator";
import {Controller, useForm} from "react-hook-form";
import {Button, TextInput, View, StyleSheet} from "react-native";
import StyledText from "@/src/components/ui/StyledText";

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

type FormData = {
  email: string;
  password: string;
}

const LoginScreen = ({navigation}: Props) => {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Login data",data);
    navigation.navigate("CarsList");
  }

  return (
    <View>
      <StyledText>Login</StyledText>
      <Controller
        control={control}
        name="email"
        render={({ field: {onChange, value} }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: {onChange, value} }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Button title="Login" onPress={handleSubmit(onSubmit)}/>
      <Button title="Register" onPress={() => navigation.navigate("Register")} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5
  }
})

export default LoginScreen;