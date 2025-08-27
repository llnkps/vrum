import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Car = {
  id: string;
  title: string;
  price: string;
  image: string;
};

type Props = {
  car: Car;
};

const CarCard =({ car }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("CarDetails", { id: car.id })}
    >
      <Image source={{ uri: car.image }} style={styles.image} />
      <Text style={styles.title}>{car.title}</Text>
      <Text style={styles.price}>{car.price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { padding: 10, borderBottomWidth: 1 },
  image: { width: "100%", height: 150, borderRadius: 8 },
  title: { fontSize: 18, marginVertical: 5 },
  price: { fontSize: 16, color: "green" },
});

export default CarCard;