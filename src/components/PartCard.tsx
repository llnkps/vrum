import {View, Image, Text, StyleSheet} from "react-native";

type Part = {
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
}

type Props = {
  part: Part;
}

const PartCard = ({part} : Props) => {
  return (
    <View>
      <Image source={{uri: part.image}} style={styles.image}/>
      <Text>{part.title}</Text>
      <Text>{part.price}</Text>
    </View>

  )
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  }
})

export default PartCard;