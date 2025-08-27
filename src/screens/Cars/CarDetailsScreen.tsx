import { View, Text, Image, Button, StyleSheet } from "react-native";
import cars from "../../data/cars.json";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import {Car} from "@/src/types/car";

type Props = NativeStackScreenProps<RootStackParamList, "CarDetails">;

const carsData: Car[] = JSON.parse(JSON.stringify(cars));

const CarDetailsScreen = ({ route }: Props) => {
  const car = carsData.find((c) => c.id === route.params.id);

  if (!car) return <Text>Car not found</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: car.image }} style={styles.image} />
      <Text style={styles.title}>{car.title}</Text>
      <Text style={styles.price}>{car.price}</Text>
      <Text>{car.description}</Text>
      <Button title="Написать продавцу" onPress={() => alert("Сообщение отправлено")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: { width: "100%", height: 200, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold" },
  price: { fontSize: 18, color: "green", marginBottom: 10 },
});

export default CarDetailsScreen;