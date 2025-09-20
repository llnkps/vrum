import { Button } from "@/components/ui/button";
import { Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CloseIcon from "@/components/global/CloseIcon";
import { useRouter } from "expo-router";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const SettingScreenFilter = () => {
  return (
    <>
      <View style={{ height: STATUSBAR_HEIGHT }}>
        <SafeAreaView>
          <StatusBar
            translucent
            backgroundColor={"red"}
            barStyle={"light-content"}
          />
        </SafeAreaView>
      </View>

      <View className="">
        <Header />

        <View className="flex-row justify-center bg-surface dark:bg-surface-dark rounded-lg mx-4 mb-2 p-1">
          <Button
            title="Все"
            // isActive={tab === ListingsTab.ACTIVE}
            // onPress={() => setTab(ListingsTab.ACTIVE)}
          />
          <Button
            title="С пробегом"
            // isActive={tab === ListingsTab.ARCHIVED}
            // onPress={() => setTab(ListingsTab.ARCHIVED)}
          />
          <Button
            title="Новые"
            // isActive={tab === ListingsTab.ARCHIVED}
            // onPress={() => setTab(ListingsTab.ARCHIVED)}
          />
        </View>

        <View className="flex-row justify-center bg-surface dark:bg-surface-dark rounded-lg mx-4 mb-2 p-1">
          {/* <View className="p-2 rounded-md bg-background-neutral-subtle-pressed dark:bg-background-neutral-subtle-dark-pressed"> */}
          <Text className="text-font dark:text-font-dark text-lg">
            Все регионы
          </Text>
          {/* </View> */}
        </View>

        <View className="flex-row justify-center bg-surface dark:bg-surface-dark rounded-lg mx-4 mb-2 p-1">
          {/* <View className="p-2 rounded-md bg-background-neutral-subtle-pressed dark:bg-background-neutral-subtle-dark-pressed"> */}
          <Text className="text-font dark:text-font-dark text-lg">
            Марка, модель, поколение
          </Text>
          {/* </View> */}
        </View>

        <View className="flex-row justify-center bg-surface dark:bg-surface-dark rounded-lg mx-4 mb-2 p-1">
          {/* <View className="p-2 rounded-md bg-background-neutral-subtle-pressed dark:bg-background-neutral-subtle-dark-pressed"> */}
          <Text className="text-font dark:text-font-dark text-lg">Год</Text>
          <Text className="text-font dark:text-font-dark text-lg">Цена</Text>
          {/* </View> */}
        </View>
      </View>
      <View className="px-4 py-3">
        <Pressable
          onPress={() => console.log("Показать результаты Pressed")}
          className={
            "px-4 py-3 flex flex-row bg-button-primary dark:bg-button-primary-dark rounded-md justify-center"
          }
        >
          <Text className="text-white font-bold">Показать результаты</Text>
        </Pressable>
      </View>
    </>
  );
};

export default SettingScreenFilter;

export const Header = () => {
  const router = useRouter();

  return (
    <View>
      <View className="flex-row justify-between">
        {/* Back button */}
        <CloseIcon onPress={() => router.dismiss()} />

        {/* Title */}
        <View className="px-3">
          <Text className="font-bold text-font dark:text-font-dark">
            Параметры
          </Text>
        </View>
      </View>
      <View>
        <Button
          onPress={() => {
            console.log("Reset");
          }}
          title="Сбросить"
        />
      </View>
    </View>
  );
};
