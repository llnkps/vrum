import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { SegmentedButton } from '@/components/common/SegmentedButton';
import { EmptyListings } from '@/components/listings/EmptyListings';
import { AddListingPanel } from '@/components/listings/AddListingPanel';
import { useListings } from '@/hooks/useListings';
import {ListingsTab} from "@/constants/navigation";

const Page = () => {
  const {
    tab,
    setTab,
    handlers: {
      handleAddAd,
    }
  } = useListings();

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
              isActive={tab === ListingsTab.ACTIVE}
              onPress={() => setTab(ListingsTab.ACTIVE)}
            />
            <SegmentedButton
              title='Архив'
              isActive={tab === ListingsTab.ARCHIVED}
              onPress={() => setTab(ListingsTab.ARCHIVED)}
            />
          </View>

          {/* Content */}
          <EmptyListings tab={tab} />
        </ScrollView>

        {/* Bottom bar */}
        <AddListingPanel onAddAd={handleAddAd} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Page;