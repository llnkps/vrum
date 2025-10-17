import { CustomRectButton } from '@/components/ui/button';
import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import FilterBadge from '@/components/global/FilterBadge';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { RegionBottomSheet } from '@/components/filters/RegionBottomSheet';
import { useAutoSelectStore } from '@/state/search-screen/useAutoSelectStore';
import { Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import CloseIcon from '@/components/global/CloseIcon';
import { useRouter } from 'expo-router';
import { useRef } from 'react';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const SettingScreenFilter = () => {
  const router = useRouter();
  const regionBottomSheetRef = useRef<BottomSheetModal>(null);

  const {
    tab,
    selectedRegions,
    onlyUnsold,
    onlyWithPhotos,
    setTab,
    setSelectedRegions,
    toggleOnlyUnsold,
    toggleOnlyWithPhotos,
    resetFilters,
  } = useAutoSelectStore();

  return (
    <>
      <View style={{ height: STATUSBAR_HEIGHT }}>
        <SafeAreaView>
          <StatusBar translucent backgroundColor={'red'} barStyle={'light-content'} />
        </SafeAreaView>
      </View>

      <Header router={router} resetFilters={resetFilters} />
      <ScrollView>
        <View className="mt-2 gap-y-4 p-2">
          <View className="flex-row justify-between rounded-lg bg-surface dark:bg-surface-dark">
            <CustomRectButton
              appearance="subtle"
              title="Все"
              isSelected={tab === 'all'}
              onPress={() => setTab('all')}
            />
            <CustomRectButton
              appearance="subtle"
              title="С пробегом"
              isSelected={tab === 'old'}
              onPress={() => setTab('old')}
            />
            <CustomRectButton
              appearance="subtle"
              title="Новые"
              isSelected={tab === 'new'}
              onPress={() => setTab('new')}
            />
          </View>

          <View className="gap-y-2">
            <TouchableHighlightRow
              label="Все регионы"
              onPress={() => regionBottomSheetRef.current?.present()}
              showRightArrow
            />
            {selectedRegions.length > 0 && (
              <View className="flex-row flex-wrap gap-2">
                {selectedRegions.map(region => (
                  <FilterBadge
                    key={region.id}
                    label={region.name || ''}
                    onRemove={() => {
                      const updatedRegions = selectedRegions.filter(r => r.id !== region.id);
                      setSelectedRegions(updatedRegions);
                    }}
                  />
                ))}
              </View>
            )}
          </View>

          <View className="rounded-lg bg-surface p-2 dark:bg-surface-dark">
            <Text className="text-lg text-font dark:text-font-dark">Марка, модель, поколение</Text>
          </View>

          <View className="flex-col rounded-lg bg-surface p-2 dark:bg-surface-dark">
            <View className="border-b-1 border-border p-2 dark:border-border-dark">
              <Text className="text-lg text-font dark:text-font-dark">Год</Text>
            </View>
            <View className="p-2">
              <Text className="text-lg text-font dark:text-font-dark">Цена</Text>
            </View>
          </View>

          <View className="flex-col rounded-lg bg-surface p-2 dark:bg-surface-dark">
            <CheckboxRectButton label="Непроданные" value={onlyUnsold} onPress={toggleOnlyUnsold} />
            <CheckboxRectButton
              label="Только с фото"
              value={onlyWithPhotos}
              onPress={toggleOnlyWithPhotos}
            />
            <CheckboxRectButton label="Документы" value={false} onPress={() => {}} />
            <CheckboxRectButton label="Повреждения" value={false} onPress={() => {}} />
          </View>

          <View className="flex-col rounded-lg bg-surface dark:bg-surface-dark">
            <TouchableHighlightRow label="Коробка передач" onPress={() => {}} showRightArrow />
            <TouchableHighlightRow label="Объем двигателя" onPress={() => {}} showRightArrow />
            <TouchableHighlightRow label="Топливо" onPress={() => {}} showRightArrow />
            <TouchableHighlightRow label="Привод" onPress={() => {}} showRightArrow />
          </View>
          <TouchableHighlightRow label="Расположения руля" onPress={() => {}} showRightArrow />
          <TouchableHighlightRow label="Мощность" onPress={() => {}} showRightArrow />
          <TouchableHighlightRow label="Пробег" onPress={() => {}} showRightArrow />
          <TouchableHighlightRow label="Кузов" onPress={() => {}} showRightArrow />
          <TouchableHighlightRow label="Цвет" onPress={() => {}} showRightArrow />
        </View>
      </ScrollView>
      <View className="px-4 py-3">
        <Pressable
          onPress={() => console.log('Показать результаты Pressed')}
          className={
            'bg-button-primary dark:bg-button-primary-dark flex flex-row justify-center rounded-md px-4 py-3'
          }
        >
          <Text className="font-bold text-white">Показать результаты</Text>
        </Pressable>
      </View>

      <RegionBottomSheet
        ref={regionBottomSheetRef}
        multiple
        onChange={regions => setSelectedRegions(Array.isArray(regions) ? regions : [regions])}
      />
    </>
  );
};

export default SettingScreenFilter;

const Header = ({ router, resetFilters }: { router: any; resetFilters: () => void }) => {
  return (
    <View className="flex-row justify-between">
      <View className="flex-row items-center">
        {/* Back button */}
        <CloseIcon onPress={() => router.dismiss()} />

        {/* Title */}
        <View className="px-3">
          <Text className="font-bold text-font dark:text-font-dark">Параметры</Text>
        </View>
      </View>
      <View>
        <CustomRectButton appearance="subtle" title="Сбросить" onPress={resetFilters} />
      </View>
    </View>
  );
};
