import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, Text, View } from 'react-native';

export const AutoDetailHeaderScreen = () => {
  return (
    <>
      <View className="px-4 py-3">
        <Text className="text-lg text-font-brand dark:text-font-brand-dark">Запчасти и шины</Text>
      </View>
      <View className={'px-4 py-3'}>
        <Pressable
          className={
            'flex flex-row justify-center rounded-md border border-border bg-background-neutral px-4 py-3 dark:border-border-dark dark:bg-background-neutral-dark'
          }
        >
          <Text className="font-bold text-font dark:text-font-dark">Показать 8888 объявлений</Text>
        </Pressable>
      </View>
    </>
  );
};

export const AutoDetailItemScreen = ({ item }) => {
  return (
    <View className="mx-2 rounded-2xl shadow-md">
      <Image source={item.image} className="h-48 w-full rounded-t-2xl" resizeMode="cover" />
      <View className="p-4">
        <Text className="text-lg font-bold text-font-brand dark:text-font-brand-dark">{item.title}</Text>
        <Text className="text-base text-font dark:text-font-dark">{item.price}</Text>
        <View className="mt-2 flex-row">
          <Text className="mr-2 text-xs text-font dark:text-font-dark">⭐ 5-star GNCAP</Text>
          <Text className="text-xs text-font dark:text-font-dark">🚗 More Mileage</Text>
        </View>
      </View>
    </View>
  );
};

const SearchSection = () => {
  const handlePress = buttonName => {
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
    <View className={'bg-background dark:bg-background-dark gap-y-1 px-4 py-3'}>
      <Pressable
        onPress={() => handlePress('Model')}
        className={
          'flex flex-row rounded-t-md border border-border bg-background-neutral px-4 py-3 dark:border-border-dark dark:bg-background-neutral-dark'
        }
      >
        <Text className="font-bold text-font dark:text-font-dark">Марка, модель, поколение</Text>
      </Pressable>
      <View className={'flex flex-row gap-1'}>
        <Pressable
          onPress={() => handlePress('Год')}
          className={'flex flex-row border border-border bg-background-neutral px-4 py-3 dark:border-border-dark dark:bg-background-neutral-dark'}
        >
          <Text className="font-bold text-font dark:text-font-dark">Год</Text>
        </Pressable>

        <Pressable
          onPress={() => handlePress('Цена')}
          className={'flex flex-row border border-border bg-background-neutral px-4 py-3 dark:border-border-dark dark:bg-background-neutral-dark'}
        >
          <Text className="font-bold text-font dark:text-font-dark">Цена</Text>
        </Pressable>

        <Pressable
          onPress={() => handlePress('Параметры')}
          className={
            'flex flex-1 flex-row border border-border bg-background-neutral px-4 py-3 dark:border-border-dark dark:bg-background-neutral-dark'
          }
        >
          <View className="flex flex-row items-center space-x-2">
            {/* The name 'sliders' comes from the FontAwesome icon library. */}
            <Ionicons name="options-sharp" size={20} color="white" />
            <Text className="font-bold text-font dark:text-font-dark">Параметры</Text>
          </View>
        </Pressable>
      </View>
      <Pressable
        onPress={() => handlePress('Все регионы')}
        className={
          'flex flex-row rounded-b-md border border-border bg-background-neutral px-4 py-3 dark:border-border-dark dark:bg-background-neutral-dark'
        }
      >
        <Text className="font-bold text-font dark:text-font-dark">Все регионы</Text>
      </Pressable>
    </View>
  );
};
