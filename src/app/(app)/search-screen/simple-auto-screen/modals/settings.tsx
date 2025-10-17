import { RegionBottomSheet } from '@/components/filters/RegionBottomSheet';
import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import FilterBadge from '@/components/global/FilterBadge';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { CustomRectButton, SelectableButton } from '@/components/ui/button';
import {
  selectSelectedBrands,
  selectSelectedGenerations,
  selectSelectedModels,
  useAutoSelectStore,
} from '@/state/search-screen/useAutoSelectStore';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BodyTypeFilterBottomSheet } from '@/components/filters/BodyTypeFilterBottomSheet';
import { ColorFilterBottomSheet } from '@/components/filters/ColorFilterBottomSheet';
import { DrivetrainFilterBottomSheet } from '@/components/filters/DrivetrainFilterBottomSheet';
import { FuelTypeFilterBottomSheet } from '@/components/filters/FuelTypeFilterBottomSheet';
import { NumberOfOwnersFilterBottomSheet } from '@/components/filters/NumberOfOwnersFilterBottomSheet';
import { PriceBottomSheet } from '@/components/filters/PriceFilterBottomSheet';
import { SellerFilterBottomSheet } from '@/components/filters/SellerFilterBottomSheet';
import { TransmissionFilterBottomSheet } from '@/components/filters/TransmissionFilterBottomSheet';
import { YearBottomSheet } from '@/components/filters/YearFilterBottomSheet';
import CloseIcon from '@/components/global/CloseIcon';
import { useRouter } from 'expo-router';
import { useCallback, useRef } from 'react';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const SettingScreenFilter = () => {
  const router = useRouter();
  const regionBottomSheetRef = useRef<BottomSheetModal>(null);

  const yearModalRef = useRef<BottomSheetModal>(null);
  const priceModalRef = useRef<BottomSheetModal>(null);
  const transmissionModalRef = useRef<BottomSheetModal>(null);
  const fuelTypeModalRef = useRef<BottomSheetModal>(null);
  const drivetrainModalRef = useRef<BottomSheetModal>(null);
  const bodyTypeModalRef = useRef<BottomSheetModal>(null);
  const colorModalRef = useRef<BottomSheetModal>(null);
  const numberOfOwnersModalRef = useRef<BottomSheetModal>(null);
  const sellerModalRef = useRef<BottomSheetModal>(null);

  const handlePresentYearModalPress = useCallback(() => {
    yearModalRef.current?.present();
  }, []);

  const handlePresentPriceModalPress = useCallback(() => {
    priceModalRef.current?.present();
  }, []);

  const handlePresentTransmissionModalPress = useCallback(() => {
    transmissionModalRef.current?.present();
  }, []);

  const handlePresentFuelTypeModalPress = useCallback(() => {
    fuelTypeModalRef.current?.present();
  }, []);

  const handlePresentDrivetrainModalPress = useCallback(() => {
    drivetrainModalRef.current?.present();
  }, []);

  const handlePresentBodyTypeModalPress = useCallback(() => {
    bodyTypeModalRef.current?.present();
  }, []);

  const handlePresentColorModalPress = useCallback(() => {
    colorModalRef.current?.present();
  }, []);

  const handlePresentNumberOfOwnersModalPress = useCallback(() => {
    numberOfOwnersModalRef.current?.present();
  }, []);

  const handlePresentSellerModalPress = useCallback(() => {
    sellerModalRef.current?.present();
  }, []);

  const store = useAutoSelectStore();
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
    transmission,
    fuelType,
    drivetrain,
    bodyType,
    color,
    numberOfOwners,
    seller,
    setTransmission,
    setFuelType,
    setDrivetrain,
    setBodyType,
    setColor,
    setYearRange,
    setPriceRange,
    setNumberOfOwners,
    setSeller,
  } = store;

  const selectedBrands = selectSelectedBrands(store);
  const selectedModels = selectSelectedModels(store);
  const selectedGenerations = selectSelectedGenerations(store);

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
          <View className="flex-row rounded-lg bg-surface dark:bg-surface-dark">
            <SelectableButton
              appearance="subtle"
              title="Все"
              isSelected={tab === 'all'}
              onPress={() => setTab('all')}
            />
            <SelectableButton
              appearance="subtle"
              title="С пробегом"
              isSelected={tab === 'old'}
              onPress={() => setTab('old')}
            />
            <SelectableButton
              appearance="subtle"
              title="Новые"
              isSelected={tab === 'new'}
              onPress={() => setTab('new')}
            />
          </View>

          <View className="gap-y-2">
            <TouchableHighlightRow
              variant="button"
              label="Все регионы"
              onPress={() => regionBottomSheetRef.current?.present()}
              showRightArrow
              rightIcon="chevron-down"
            />
            {selectedRegions.length > 0 && (
              <ScrollView horizontal>
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
              </ScrollView>
            )}
          </View>
          <View className="gap-y-1">
            <TouchableHighlightRow
              variant="button"
              label="Марка, модель, поколение"
              selectedValue={selectedBrands.map(b => b.name).join(', ')}
              selectedValueMode="replace"
              onPress={() =>
                router.push(
                  '/(app)/search-screen/simple-auto-screen/modals/brand-auto-filter?from=settings'
                )
              }
              showRightArrow
            />

            {selectedBrands.length > 0 && (
              <TouchableHighlightRow
                variant="button"
                label="Модель"
                selectedValue={selectedModels.map(m => m.name).join(', ')}
                selectedValueMode="replace"
                onPress={() =>
                  router.push(
                    '/(app)/search-screen/simple-auto-screen/modals/model-filter?from=settings'
                  )
                }
                showRightArrow
              />
            )}

            {selectedModels.length > 0 && (
              <TouchableHighlightRow
                variant="button"
                label="Поколение"
                selectedValue={selectedGenerations.map(m => `${m.generation} поколение`).join(', ')}
                selectedValueMode="replace"
                onPress={() =>
                  router.push(
                    '/(app)/search-screen/simple-auto-screen/modals/generation-filter?from=settings'
                  )
                }
                showRightArrow
              />
            )}
          </View>

          <View className="flex-col rounded-lg bg-surface p-2 dark:bg-surface-dark">
            <TouchableHighlightRow
              label="Год"
              // selectedValue={getYearDisplayValue()}
              onPress={handlePresentYearModalPress}
              variant="bordered"
              showRightArrow={false}
              selectedValueMode="replace"
            />

            <TouchableHighlightRow
              label="Цена"
              // selectedValue={getPriceDisplayValue()}
              onPress={handlePresentPriceModalPress}
              variant="plain"
              showRightArrow={false}
              selectedValueMode="replace"
            />

            <YearBottomSheet ref={yearModalRef} onChange={yearRange => setYearRange(yearRange)} />
            <PriceBottomSheet
              ref={priceModalRef}
              onChange={priceRange => setPriceRange(priceRange)}
            />
          </View>

          <View className="flex-col rounded-lg bg-surface dark:bg-surface-dark">
            <CheckboxRectButton label="Непроданные" value={onlyUnsold} onPress={toggleOnlyUnsold} />
            <CheckboxRectButton
              label="Только с фото"
              value={onlyWithPhotos}
              onPress={toggleOnlyWithPhotos}
            />
            <CheckboxRectButton label="Документы" value={false} onPress={() => {}} />
            <CheckboxRectButton label="Повреждения" value={false} onPress={() => {}} />
          </View>

          <View className="flex-col rounded-lg bg-surface p-2 dark:bg-surface-dark">
            <TouchableHighlightRow
              label="Коробка передач"
              onPress={handlePresentTransmissionModalPress}
              showRightArrow
              variant="bordered"
              selectedValue={transmission}
              rightIcon="chevron-down"
            />
            <TouchableHighlightRow
              label="Объем двигателя"
              onPress={() => {}}
              showRightArrow
              variant="bordered"
              rightIcon="chevron-down"
            />
            <TouchableHighlightRow
              label="Топливо"
              onPress={handlePresentFuelTypeModalPress}
              showRightArrow
              variant="bordered"
              selectedValue={fuelType}
              rightIcon="chevron-down"
            />
            <TouchableHighlightRow
              label="Привод"
              onPress={handlePresentDrivetrainModalPress}
              showRightArrow
              variant="bordered"
              selectedValue={drivetrain}
              rightIcon="chevron-down"
            />
            <TouchableHighlightRow
              label="Расположения руля"
              onPress={() => {}}
              showRightArrow
              variant="bordered"
              rightIcon="chevron-down"
            />
            <TouchableHighlightRow
              label="Мощность"
              onPress={() => {}}
              showRightArrow
              variant="bordered"
              rightIcon="chevron-down"
            />
            <TouchableHighlightRow
              label="Пробег"
              onPress={() => {}}
              showRightArrow
              variant="bordered"
              rightIcon="chevron-down"
            />
            <TouchableHighlightRow
              label="Кузов"
              onPress={handlePresentBodyTypeModalPress}
              showRightArrow
              variant="bordered"
              selectedValue={bodyType}
              rightIcon="chevron-down"
            />
            <TouchableHighlightRow
              label="Цвет"
              onPress={handlePresentColorModalPress}
              showRightArrow
              variant="plain"
              selectedValue={color}
              rightIcon="chevron-down"
            />
          </View>

          <View className="flex-col rounded-lg bg-surface p-2 dark:bg-surface-dark">
            <TouchableHighlightRow
              label="Количество владельцев"
              onPress={handlePresentNumberOfOwnersModalPress}
              showRightArrow
              variant="bordered"
              selectedValue={numberOfOwners}
              rightIcon="chevron-down"
            />
            <TouchableHighlightRow
              label="Продавец"
              onPress={handlePresentSellerModalPress}
              showRightArrow
              variant="plain"
              selectedValue={seller}
              rightIcon="chevron-down"
            />
          </View>
        </View>
      </ScrollView>

      <View className="px-4 py-8">
        <CustomRectButton
          onPress={() =>
            router.replace('/(app)/search-screen/simple-auto-screen/modals/simple-auto-modal')
          }
          appearance="primary"
        >
          <Text className="text-center font-semibold text-white">Показать объявления</Text>
        </CustomRectButton>
      </View>

      <RegionBottomSheet
        ref={regionBottomSheetRef}
        multiple
        onChange={regions => setSelectedRegions(Array.isArray(regions) ? regions : [regions])}
      />

      <TransmissionFilterBottomSheet
        ref={transmissionModalRef}
        onSelect={(option: { label: string; value: string }) => {
          setTransmission(option.value);
          transmissionModalRef.current?.close({ duration: 150 });
        }}
      />

      <FuelTypeFilterBottomSheet
        ref={fuelTypeModalRef}
        onSelect={(option: { label: string; value: string }) => {
          setFuelType(option.value);
          fuelTypeModalRef.current?.close({ duration: 150 });
        }}
      />

      <DrivetrainFilterBottomSheet
        ref={drivetrainModalRef}
        onSelect={(option: { label: string; value: string }) => {
          setDrivetrain(option.value);
          drivetrainModalRef.current?.close({ duration: 150 });
        }}
      />

      <BodyTypeFilterBottomSheet
        ref={bodyTypeModalRef}
        onSelect={(option: { label: string; value: string }) => {
          setBodyType(option.value);
          bodyTypeModalRef.current?.close({ duration: 150 });
        }}
      />

      <ColorFilterBottomSheet
        ref={colorModalRef}
        onSelect={(option: { label: string; value: string }) => {
          setColor(option.value);
          colorModalRef.current?.close({ duration: 150 });
        }}
      />

      <NumberOfOwnersFilterBottomSheet
        ref={numberOfOwnersModalRef}
        onSelect={(option: { label: string; value: string }) => {
          setNumberOfOwners(option.value);
          numberOfOwnersModalRef.current?.close({ duration: 150 });
        }}
      />

      <SellerFilterBottomSheet
        ref={sellerModalRef}
        onSelect={(option: { label: string; value: string }) => {
          setSeller(option.value);
          sellerModalRef.current?.close({ duration: 150 });
        }}
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
