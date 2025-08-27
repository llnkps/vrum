import {FlatList, View} from "react-native";
import {Part} from "@/src/types/part";
import parts from "../../data/parts.json";
import PartCard from "@/src/components/PartCard";


const partsData: Part[] = JSON.parse(JSON.stringify(parts))

const PartsListScreen = () => {
  return(
    <View>
      <FlatList
        data={partsData}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <PartCard part={item} />}
      />
    </View>
  )
};

export default PartsListScreen;