import { Button } from "@/components/ui/button";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CloseIcon from "@/components/global/CloseIcon";
import { useRouter } from "expo-router";
import { useState } from "react";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

enum Tab {
  All = "all",
  OLD = "old",
  NEW = "new",
}

const SettingScreenFilter = () => {
  const [tab, setTab] = useState(Tab.All);

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

      <Header />
      <ScrollView>
        <View className="mt-2 p-2 gap-y-4">
          <View className="flex-row justify-between bg-surface dark:bg-surface-dark rounded-lg">
            <Button
              useNativePressable
              appearance="subtle"
              title="Все"
              isSelected={tab === Tab.All}
              onPress={() => setTab(Tab.All)}
            />
            <Button
              useNativePressable
              appearance="subtle"
              title="С пробегом"
              isSelected={tab === Tab.OLD}
              onPress={() => setTab(Tab.OLD)}
            />
            <Button
              useNativePressable
              appearance="subtle"
              title="Новые"
              isSelected={tab === Tab.NEW}
              onPress={() => setTab(Tab.NEW)}
            />
          </View>

          <View className="gap-y-2">
            <View className="bg-surface dark:bg-surface-dark rounded-lg p-2">
              <Text className="text-font dark:text-font-dark text-lg">
                Все регионы
              </Text>
            </View>
            <View className="flex-row">
              <View className="bg-surface dark:bg-surface-dark rounded-full py-1 px-2">
                <Text className="text-font dark:text-font-dark">Кишинев</Text>
              </View>
              <View className="bg-surface dark:bg-surface-dark rounded-full py-1 px-2">
                <Text className="text-font dark:text-font-dark">Бельцы</Text>
              </View>
            </View>
          </View>

          <View className="bg-surface dark:bg-surface-dark rounded-lg p-2">
            <Text className="text-font dark:text-font-dark text-lg">
              Марка, модель, поколение
            </Text>
          </View>

          <View className="flex-col bg-surface dark:bg-surface-dark rounded-lg p-2">
            <View className="p-2 border-b-1 border-border dark:border-border-dark">
              <Text className="text-font dark:text-font-dark text-lg">Год</Text>
            </View>
            <View className="p-2">
              <Text className="text-font dark:text-font-dark text-lg">
                Цена
              </Text>
            </View>
          </View>

          <View className="flex-col bg-surface dark:bg-surface-dark rounded-lg p-2">
            <View className="p-2 border-b-1 border-border dark:border-border-dark">
              <Text className="text-font dark:text-font-dark text-lg">
                Непроданные
              </Text>
            </View>
            <View className="p-2 border-b-1 border-border dark:border-border-dark">
              <Text className="text-font dark:text-font-dark text-lg">
                Только с фото
              </Text>
            </View>
            <View className="p-2 border-b-1 border-border dark:border-border-dark">
              <Text className="text-font dark:text-font-dark text-lg">
                Документы
              </Text>
            </View>
            <View className="p-2">
              <Text className="text-font dark:text-font-dark text-lg">
                Повреждения
              </Text>
            </View>
          </View>

          <View className="flex-col bg-surface dark:bg-surface-dark rounded-lg p-2">
            <View className="p-2 border-b-1 border-border dark:border-border-dark">
              <Text className="text-font dark:text-font-dark text-lg">
                Коробка передач
              </Text>
            </View>
            <View className="p-2 border-b-1 border-border dark:border-border-dark">
              <Text className="text-font dark:text-font-dark text-lg">
                Объем двигателя
              </Text>
            </View>
            <View className="p-2 border-b-1 border-border dark:border-border-dark">
              <Text className="text-font dark:text-font-dark text-lg">
                Топливо
              </Text>
            </View>
            <View className="p-2 border-b-1 border-border dark:border-border-dark">
              <Text className="text-font dark:text-font-dark text-lg">
                Привод
              </Text>
            </View>
            <View className="p-2 border-b-1 border-border dark:border-border-dark">
              <Text className="text-font dark:text-font-dark text-lg">
                Расположения руля
              </Text>
            </View>
            <View className="p-2 border-b-1 border-border dark:border-border-dark">
              <Text className="text-font dark:text-font-dark text-lg">
                Мощность
              </Text>
            </View>
            <View className="p-2 border-b-1 border-border dark:border-border-dark">
              <Text className="text-font dark:text-font-dark text-lg">
                Пробег
              </Text>
            </View>
            <View className="p-2 border-b-1 border-border dark:border-border-dark">
              <Text className="text-font dark:text-font-dark text-lg">
                Кузов
              </Text>
            </View>

            <View className="p-2">
              <Text className="text-font dark:text-font-dark text-lg">
                Цвет
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    <View className="flex-row justify-between">
      <View className="flex-row items-center">
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
          appearance="subtle"
          onPress={() => {
            console.log("Reset");
          }}
          title="Сбросить"
        />
      </View>
    </View>
  );
};
