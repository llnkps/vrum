import {View, FlatList, Button} from "react-native";
import cars from "../../data/cars.json";
import CarCard from "../../components/CarCard";
import {Car} from "@/src/types/car";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/src/navigation/AppNavigator";

const carsData: Car[] = JSON.parse(JSON.stringify(cars));

type Props = NativeStackScreenProps<RootStackParamList, 'PartsList'>;

const CarsListScreen = ({navigation} : Props) => {

  return (
    <View>
      <FlatList
        data={carsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CarCard car={item} />}
      />
      <Button title="Parts" onPress={() => navigation.navigate("PartsList")} />

    </View>
  );
}

export default CarsListScreen;