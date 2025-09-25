import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { EmptyAds } from '@/components/ads/EmptyAds';
import { AddAdsPanel } from '@/components/ads/AddAdsPanel';
import { useAds } from '@/hooks/useAds';
import {AdsTab} from "@/constants/navigation";
import {SegmentedButton} from "@/components/ui/button";


const Page = () => {
  const {
    tab,
    setTab,
    handlers: {
      handleAddAd,
    }
  } = useAds();

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1'>
        <ScrollView className='flex-1' contentContainerStyle={{ flexGrow: 1 }}>
          {/* Title */}
          <View className='px-4 pt-5 pb-6'>
            <Text className='text-black text-2xl font-bold'>
              Мои объявления
            </Text>
          </View>

          {/* Tabs */}
          <View className='flex-row justify-center bg-neutral-400 rounded-lg mx-4 mb-2 p-1'>
            <SegmentedButton
              title='Активные'
              isActive={tab === AdsTab.ACTIVE}
              onPress={() => setTab(AdsTab.ACTIVE)}
            />
            <SegmentedButton
              title='Архив'
              isActive={tab === AdsTab.ARCHIVED}
              onPress={() => setTab(AdsTab.ARCHIVED)}
            />
          </View>

          {/* Content */}
          <EmptyAds tab={tab} />
        </ScrollView>

        {/* Bottom bar */}
        <AddAdsPanel onAddAd={handleAddAd} />



      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Page;