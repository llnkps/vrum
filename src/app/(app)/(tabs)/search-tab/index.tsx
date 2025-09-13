import { useNavigation, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AutoHeaderScreen, AutoItemScreen
} from '@/app/(app)/(tabs)/search-tab/category-top-tabs/auto-screen';
import {
  AutoDetailHeaderScreen, AutoDetailItemScreen
} from '@/app/(app)/(tabs)/search-tab/category-top-tabs/auto_detail-screen';
import {
  MotoHeaderScreen, MotoItemScreen
} from '@/app/(app)/(tabs)/search-tab/category-top-tabs/moto-screen';
import {
  SpecAutoHeaderScreen, SpecAutoItemScreen
} from '@/app/(app)/(tabs)/search-tab/category-top-tabs/spec_auto-screen';
import { Header } from '@/components/global/Header';
import { HeaderCategory } from '@/components/search-screen/HeaderCategory';
import { ActiveScreen } from '@/components/search-screen/types';
import BottomSheet, {
  BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView
} from '@gorhom/bottom-sheet';

const data = [
  {
    id: 1,
    title: "Tata Punch",
    price: "₹ 5.99 Lakh",
    image: require("@/data/images/1images.jpeg"), // use your car image
  },
  {
    id: 2,
    title: "Hyundai Venue",
    price: "₹ 7.89 Lakh",
    image: require("@/data/images/2LEAD.jpg"),
  },

  {
    id: 3,
    title: "Hyundai Venue",
    price: "₹ 7.89 Lakh",
    image: require("@/data/images/2LEAD.jpg"),
  },
  {
    id: 4,
    title: "Hyundai Venue",
    price: "₹ 7.89 Lakh",
    image: require("@/data/images/2LEAD.jpg"),
  },
  {
    id: 5,
    title: "Hyundai Venue",
    price: "₹ 7.89 Lakh",
    image: require("@/data/images/2LEAD.jpg"),
  },
  {
    id: 6,
    title: "Hyundai Venue",
    price: "₹ 7.89 Lakh",
    image: require("@/data/images/2LEAD.jpg"),
  },
  {
    id: 7,
    title: "Hyundai Venue",
    price: "₹ 7.89 Lakh",
    image: require("@/data/images/2LEAD.jpg"),
  },
  {
    id: 8,
    title: "Hyundai Venue",
    price: "₹ 7.89 Lakh",
    image: require("@/data/images/2LEAD.jpg"),
  },
  {
    id: 9,
    title: "Hyundai Venue",
    price: "₹ 7.89 Lakh",
    image: require("@/data/images/2LEAD.jpg"),
  },
  {
    id: 10,
    title: "Hyundai Venue",
    price: "₹ 7.89 Lakh",
    image: require("@/data/images/2LEAD.jpg"),
  },

];


const renderContent = (activeScreen: ActiveScreen) => {
  if (activeScreen === "auto") {
    return {
      header: AutoHeaderScreen,
      item: AutoItemScreen,
    }
  } else if (activeScreen === "auto_detail") {
    return {
      header: AutoDetailHeaderScreen,
      item: AutoDetailItemScreen,
    }
  } else if (activeScreen === "spec_auto") {
    return {
      header: SpecAutoHeaderScreen,
      item: SpecAutoItemScreen,
    }
  } else if (activeScreen === "moto") {
    return {
      header: MotoHeaderScreen,
      item: MotoItemScreen,
    }
  }
  // Add other conditions for different screens if needed
  return null;
}

export default function SearchScreen() {
  const [activeSreen, setActiveSreen] = useState<ActiveScreen>("auto");

  const { header: HeaderScreen, item: RenderItemScreen } = renderContent(activeSreen) || {};

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['1%', '90%'], []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  const handleOpen = useCallback(() => {
    console.log("open sheet")
    bottomSheetRef.current?.expand();
  }, []);





 const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);



  return (
    <SafeAreaView className="flex-1">
      {/*         
        <BottomSheetModalProvider>
          <Button
            onPress={handlePresentModalPress}
            title="Present Modal"
            color="black"
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
          >
            <BottomSheetView>
              <Text>Awesome 🎉</Text>
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider> */}

      {/* 
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
      // enablePanDownToClose={true}
      // backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View className='flex-1 items-center justify-center p-4'>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>Bottom Sheet Content</Text>
            <Text>You can put buttons, inputs, or anything here 🚀</Text>
          </View>
        </BottomSheetView>
      </BottomSheet> */}

      <View>
        <Animated.FlatList
          ListHeaderComponent={
            <>
              <Header />
              <HeaderCategory activeScreen={activeSreen} setActiveScreen={setActiveSreen} />
              {HeaderScreen && <HeaderScreen handleOpen={handleOpen} />}
            </>
          }
          data={data}
          renderItem={({ item, index }) => (
            <Animated.ScrollView entering={FadeIn.delay(index * 400).duration(800)}>
              {RenderItemScreen && <RenderItemScreen item={item} />}
            </Animated.ScrollView>
          )}
          contentContainerClassName="pt-4"
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <BottomSheetModalProvider>
        <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="black"
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // hidden by default
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView>
          <View className="flex-1 p-4">
            <Animated.Text className="text-lg font-bold">Filters</Animated.Text>
            {/* Your filters, inputs, or actions go here */}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});