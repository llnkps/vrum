import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, Text, View } from 'react-native';

export const MotoHeaderScreen = () => {
  return (
    <>
      <SearchSection />
      <View className={"px-4 py-3"}>
        <Pressable
          className={"px-4 py-3 flex flex-row justify-center bg-background-neutral dark:bg-background-neutral-dark rounded-md border border-border dark:border-border-dark"}
        >
          <Text className="text-font dark:text-font-dark font-bold">Показать 8888 объявлений</Text>
        </Pressable>
      </View>
    </>
  )
}

export const MotoItemScreen = ({ item }) => {
  return (
    <View className="mx-2 rounded-2xl shadow-md">
      <Image
        source={item.image}
        className="w-full h-48 rounded-t-2xl"
        resizeMode="cover"
      />
      <View className="p-4">
        <Text className="text-lg font-bold text-font-brand dark:text-font-brand-dark">
          {item.title}
        </Text>
        <Text className="text-base text-font dark:text-font-dark">{item.price}</Text>
        <View className="flex-row mt-2">
          <Text className="text-xs text-font dark:text-font-dark mr-2">⭐ 5-star GNCAP</Text>
          <Text className="text-xs text-font dark:text-font-dark">🚗 More Mileage</Text>
        </View>
      </View>
    </View>
  )
}

  const SearchSection = () => {

    const handlePress = (buttonName) => {
      console.log(`Button "${buttonName}" was pressed.`);
      // You can add navigation or other logic here.
    };

    // const getPressableStyle = (pressed) => {
    //   // return [
    //   //   tailwind('flex-1 justify-center items-center p-3 border-gray-700'),
    //   //   pressed && tailwind('bg-gray-800'),
    //   // ];
    // };

    return (
      <View className={"px-4 py-3 gap-y-1 bg-background dark:bg-background-dark"}>
        <Pressable
          onPress={() => handlePress('Model')}
          className={"px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark rounded-t-md border border-border dark:border-border-dark"}
        >
          <Text className="text-font dark:text-font-dark font-bold">Раздел, класс</Text>
        </Pressable>
        
        <Pressable
          onPress={() => handlePress('Model')}
          className={"px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark border border-border dark:border-border-dark"}
        >
          <Text className="text-font dark:text-font-dark font-bold">Марка, модель, модификация</Text>
        </Pressable>

        <View className={"flex flex-row gap-1"}>
          <Pressable
            onPress={() => handlePress('Год')}
            className={"px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark border border-border dark:border-border-dark"}
          >
            <Text className="text-font dark:text-font-dark font-bold">Год</Text>
          </Pressable>

          <Pressable
            onPress={() => handlePress('Цена')}
            className={"px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark border border-border dark:border-border-dark"}
          >
            <Text className="text-font dark:text-font-dark font-bold">Цена</Text>
          </Pressable>

          <Pressable
            onPress={() => handlePress('Параметры')}
            className={"flex-1 px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark border border-border dark:border-border-dark"}
          >
            <View className="flex flex-row items-center space-x-2">
              {/* The name 'sliders' comes from the FontAwesome icon library. */}
              <Ionicons name="options-sharp" size={20} color="white" />
              <Text className="text-font dark:text-font-dark font-bold">Параметры</Text>
            </View>
          </Pressable>
        </View>
        <Pressable
          onPress={() => handlePress('Все регионы')}
          className={"px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark rounded-b-md border border-border dark:border-border-dark"}
        >
          <Text className="text-font dark:text-font-dark font-bold">Все регионы</Text>
        </Pressable>
      </View>
    );
  }