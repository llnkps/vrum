import { useNavigation, useRouter } from 'expo-router';
import { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

import CloseIcon from '@/components/global/CloseIcon';
import CustomBottomSheetModal from '@/components/global/CustomBottomSheetModal';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetScrollView, BottomSheetSectionList, BottomSheetView, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { YearPicker } from '@/components/global/YearPicket';
import { FlatList } from 'react-native-gesture-handler';

export const AutoHeaderScreen = () => {
  const { t } = useTranslation();

  return (
    <>
      <SearchSection />
      <View className={"px-4 py-3"}>
        <Pressable
          className={"px-4 py-3 flex flex-row justify-center bg-background-neutral dark:bg-background-neutral-dark rounded-md border border-border dark:border-border-dark"}
        >
          <Text className="text-font dark:text-font-dark font-bold">{t("searchScreen.auto.searchPlaceholder")}</Text>
        </Pressable>
      </View>
    </>
  )
}

export const AutoItemScreen = ({ item }) => {
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


const years = Array.from({ length: 50 }, (_, i) => 2025 - i); // 2025 → 1975

const SearchSection = () => {
  const router = useRouter();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const { dismiss } = useBottomSheetModal();
  // const getPressableStyle = (pressed) => {
  //   // return [
  //   //   tailwind('flex-1 justify-center items-center p-3 border-gray-700'),
  //   //   pressed && tailwind('bg-gray-800'),
  //   // ];
  // };
  const sections = useMemo(
    () =>
      Array(10)
        .fill(0)
        .map((_, index) => ({
          title: `Section ${index}`,
          data: Array(10)
            .fill(0)
            .map((_, index) => `Item ${index}`),
        })),
    []
  );
  const renderSectionHeader = useCallback(
    ({ section }) => (
      <View>
        <Text>{section.title}</Text>
      </View>
    ),
    []
  );
  // const renderItem = useCallback(
  //   ({ item }) => (
  //     <View>
  //       <Text>{item}</Text>
  //     </View>
  //   ),
  //   []
  // );




  const data = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

  const renderItem = ({ item }) => (
    <BottomSheetView style={{ padding: 10 }}>
      <Text>{item}</Text>
    </BottomSheetView>
  );

  return (
    <View className={"px-4 py-3 gap-y-1 bg-background dark:bg-background-dark"}>
      <Pressable
        onPress={() => router.push("/search-screen/auto-screen/brand-auto-filter")}
        className={"px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark rounded-t-md border border-border dark:border-border-dark"}
      >
        <Text className="text-font dark:text-font-dark font-bold">Марка, модель, поколение</Text>
      </Pressable>
      <View className={"flex flex-row gap-1"}>
        <Pressable
          onPress={() => handlePresentModalPress()}
          className={"px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark border border-border dark:border-border-dark"}
        >
          <Text className="text-font dark:text-font-dark font-bold">Год</Text>
        </Pressable>

        <Pressable
          onPress={() => ""}
          className={"px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark border border-border dark:border-border-dark"}
        >
          <Text className="text-font dark:text-font-dark font-bold">Цена</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/search-screen/auto-screen/settings")}
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


      <CustomBottomSheetModal ref={bottomSheetModalRef} snapPoints={["40%"]}>
        <BottomSheetView style={{ padding: 16, borderBottomWidth: 1, borderColor: '#eee' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Header Content</Text>
        </BottomSheetView>
        {/* <BottomSheetSectionList
          sections={sections}
          keyExtractor={(i) => i}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
        /> */}
        <BottomSheetView>
          <View className="flex flex-row justify-between">
            <Text className="text-font dark:text-font-dark font-bold text-lg">Год</Text>
            <CloseIcon onPress={() => dismiss()} />
          </View>

          <View className="flex flex-row">
            <Text className="text-font">dasdsa</Text>
            <Text className="text-font">dasdsa</Text>
            <Text className="text-font">dasdsa</Text>
          </View>
        </BottomSheetView>
        <FlatList
          data={years}
          renderItem={({ item, index }) => (
            <View>
              <Text className='text-font'>{item}</Text>
            </View>
          )}
          contentContainerClassName="pt-4"
          keyExtractor={(item) => item.toString()}
        />
        {/* <BottomSheetScrollView>
          {years.map((item) => {
            return (
              <Pressable
                key={item.toString()}
              // onPress={() => handleSelect(item)}

              >
                <Text className="text-font">{item}</Text>
              </Pressable>
            )
          })}
        </BottomSheetScrollView> */}
        {/* <BottomSheetView>
          <View className="flex flex-row justify-end">
            <Pressable>
              <Text>Сброс</Text>
            </Pressable>
            <Pressable>
              <Text>Применить</Text>
            </Pressable>
          </View>
        </BottomSheetView> */}
      </CustomBottomSheetModal>
    </View>
  );
}
