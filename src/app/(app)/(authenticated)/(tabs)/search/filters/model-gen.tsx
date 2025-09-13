import { View, Text, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ModelItemScreenFilter = () => {
  return (
    <>
      <SafeAreaView>
        <View className="mx-2 rounded-2xl shadow-md">
          <View className="p-4">
            <Text className="text-lg font-bold text-font-brand dark:text-font-brand-dark">
              dasqq
            </Text>
            <Text className="text-base text-font dark:text-font-dark">22</Text>
            <View className="flex-row mt-2">
              <Text className="text-xs text-font dark:text-font-dark mr-2">⭐ 5-star GNCAP</Text>
              <Text className="text-xs text-font dark:text-font-dark">🚗 More Mileage</Text >
            </View>
          </View>
        </View>
        <View className="px-4 py-3 gap-y-1 bg-background dark:bg-background-dark">
          <Pressable
            onPress={() => console.log('Model Pressed')}
            className={"px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark rounded-t-md border border-border dark:border-border-dark"}
          >
            <Text className="text-font dark:text-font-dark font-bold">Марка, модель, поколение</Text>
          </Pressable>
          <View className={"flex flex-row gap-1"}>
            <Pressable
              onPress={() => console.log('Год Pressed')}
              className={"px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark border border-border dark:border-border-dark"}
            >
              <Text className="text-font dark:text-font-dark font-bold">Год</Text>
            </Pressable>

            <Pressable
              onPress={() => console.log('Цена Pressed')}
              className={"px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark border border-border dark:border-border-dark"}
            >
              <Text className="text-font dark:text-font-dark font-bold">Цена</Text>
            </Pressable>
          </View>
          <Pressable
            onPress={() => console.log('Еще Pressed')}
            className={"px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark rounded-b-md border border-border dark:border-border-dark"}
          >
            <Text className="text-font dark:text-font-dark font-bold">Еще</Text>
          </Pressable>
        </View>
        <View className="px-4 py-3">
          <Pressable
            onPress={() => console.log('Показать результаты Pressed')}
            className={"px-4 py-3 flex flex-row bg-button-primary dark:bg-button-primary-dark rounded-md justify-center"}
          >
            <Text className="text-white font-bold">Показать результаты</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  )
}


export default ModelItemScreenFilter;