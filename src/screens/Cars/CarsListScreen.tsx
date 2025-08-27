import { View, FlatList } from "react-native";
import cars from "../../data/cars.json";
import CarCard from "../../components/CarCard";
import {Car} from "@/src/types/car";

const carsData: Car[] = JSON.parse(JSON.stringify(cars));


const CarsListScreen = () => {

  return (
    <View>
      <FlatList
        data={carsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CarCard car={item} />}
      />
    </View>
  );
}

export default CarsListScreen;