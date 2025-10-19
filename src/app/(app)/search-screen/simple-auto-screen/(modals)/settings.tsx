import { SelectedRegionsBadges } from '@/components/global/SelectedItemsBadges';
import { RegionBottomSheet } from '@/components/filters/RegionBottomSheet';
import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { CustomRectButton, SelectableButton } from '@/components/ui/button';
import {
  getEngineCapacityDisplayValue,
  getMileageDisplayValue,
  getPowerDisplayValue,
  getPriceDisplayValue,
  getYearDisplayValue,
  selectSelectedBrands,
  selectSelectedGenerations,
  selectSelectedModels,
  useAutoSelectStore,
} from '@/state/search-screen/useAutoSelectStore';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BodyTypeFilterBottomSheet } from '@/components/filters/BodyTypeFilterBottomSheet';
import { ColorFilterBottomSheet } from '@/components/filters/ColorFilterBottomSheet';
import { DrivetrainFilterBottomSheet } from '@/components/filters/DrivetrainFilterBottomSheet';
import EngineCapacityFilterBottomSheet from '@/components/filters/EngineCapacityFilterBottomSheet';
import { FuelTypeFilterBottomSheet } from '@/components/filters/FuelTypeFilterBottomSheet';
import { NumberOfOwnersFilterBottomSheet } from '@/components/filters/NumberOfOwnersFilterBottomSheet';
import PowerFilterBottomSheet from '@/components/filters/PowerFilterBottomSheet';
import { PriceBottomSheet } from '@/components/filters/PriceFilterBottomSheet';
import { SellerFilterBottomSheet } from '@/components/filters/SellerFilterBottomSheet';
import { TransmissionFilterBottomSheet } from '@/components/filters/TransmissionFilterBottomSheet';
import { YearBottomSheet } from '@/components/filters/YearFilterBottomSheet';
import CloseIcon from '@/components/global/CloseIcon';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import MileageFilterBottomSheet from '@/components/filters/MileageFilterBottomSheet/MileageFilterBottomSheet';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const SettingScreenFilter = () => {
  const router = useRouter();

  const regionBottomSheetRef = useRef<BottomSheetModal>(null);
  const yearModalRef = useRef<BottomSheetModal>(null);
  const priceModalRef = useRef<BottomSheetModal>(null);
  const transmissionModalRef = useRef<BottomSheetModal>(null);
  const fuelTypeModalRef = useRef<BottomSheetModal>(null);
  const mileageModalRef = useRef<BottomSheetModal>(null);
  const drivetrainModalRef = useRef<BottomSheetModal>(null);
  const bodyTypeModalRef = useRef<BottomSheetModal>(null);
  const colorModalRef = useRef<BottomSheetModal>(null);
  const numberOfOwnersModalRef = useRef<BottomSheetModal>(null);
  const sellerModalRef = useRef<BottomSheetModal>(null);
  const engineCapacityModalRef = useRef<BottomSheetModal>(null);
  const powerModalRef = useRef<BottomSheetModal>(null);

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

  const handlePresentMileageModalPress = useCallback(() => {
    mileageModalRef.current?.present();
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

  const handlePresentEngineCapacityModalPress = useCallback(() => {
    engineCapacityModalRef.current?.present();
  }, []);

  const handlePresentPowerModalPress = useCallback(() => {
    powerModalRef.current?.present();
  }, []);

  const [isBrandSectionCollapsed, setIsBrandSectionCollapsed] = useState(true);

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
    setEngineCapacityRange,
    setPowerRange,
    setMileageRange,
    setNumberOfOwners,
    setSeller,
  } = store;

  const selectedBrands = selectSelectedBrands(store);
  const selectedModels = selectSelectedModels(store);
  const selectedGenerations = selectSelectedGenerations(store);
  return (
    <>
      <SafeAreaView>
        <Header router={router} resetFilters={resetFilters} />
        <ScrollView>
          <View className="mt-2 gap-y-4 p-2">
            <View className="flex-row rounded-lg bg-surface dark:bg-surface-dark">
              <SelectableButton appearance="subtle" title="Все" isSelected={tab === 'all'} onPress={() => setTab('all')} />
              <SelectableButton appearance="subtle" title="С пробегом" isSelected={tab === 'old'} onPress={() => setTab('old')} />
              <SelectableButton appearance="subtle" title="Новые" isSelected={tab === 'new'} onPress={() => setTab('new')} />
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
                <SelectedRegionsBadges
                  selectedRegions={selectedRegions}
                  onRemove={region => {
                    const updatedRegions = selectedRegions.filter(r => r.id !== region.id);
                    setSelectedRegions(updatedRegions);
                  }}
                />
              )}
            </View>

            <View className="gap-y-1">
              <TouchableHighlightRow
                variant="button"
                label="Марка, модель, поколение"
                onPress={() => router.push('/(app)/search-screen/simple-auto-screen/(modals)/brand-auto-filter?from=settings')}
                showRightArrow
              />
              {selectedBrands.length !== 0 && (
                <>
                  {selectedBrands.map(brand => {
                    const selectedModels = store.getSelectedModelsByBrand(brand.id);
                    return (
                      <React.Fragment key={brand.id}>
                        <TouchableHighlightRow
                          variant="button"
                          label="Марка, модель, поколение"
                          selectedValue={brand.name}
                          selectedValueMode="replace"
                          onPress={() => setIsBrandSectionCollapsed(!isBrandSectionCollapsed)}
                          showRightArrow
                          rightIcon={isBrandSectionCollapsed ? 'chevron-down' : 'chevron-up'}
                        />
                        <Collapsible collapsed={isBrandSectionCollapsed}>
                          <View className="ml-4 gap-y-1">
                            <TouchableHighlightRow
                              variant="button"
                              label="Модель"
                              selectedValue={selectedModels.map(m => m.name).join(', ')}
                              selectedValueMode="replace"
                              onPress={() => router.push('/(app)/search-screen/simple-auto-screen/(modals)/model-filter?from=settings')}
                              showRightArrow
                            />

                            {selectedModels.length > 0 && (
                              <TouchableHighlightRow
                                variant="button"
                                label="Поколение"
                                selectedValue={selectedGenerations.map(m => `${m.generation} поколение`).join(', ')}
                                selectedValueMode="replace"
                                onPress={() => router.push('/(app)/search-screen/simple-auto-screen/(modals)/generation-filter?from=settings')}
                                showRightArrow
                              />
                            )}
                          </View>
                        </Collapsible>
                      </React.Fragment>
                    );
                  })}
                </>
              )}
            </View>

            <View className="flex-col rounded-lg bg-surface p-2 dark:bg-surface-dark">
              <TouchableHighlightRow
                label="Год"
                selectedValue={getYearDisplayValue(store)}
                onPress={handlePresentYearModalPress}
                variant="bordered"
                showRightArrow={false}
                selectedValueMode="replace"
              />

              <TouchableHighlightRow
                label="Цена"
                selectedValue={getPriceDisplayValue(store)}
                onPress={handlePresentPriceModalPress}
                variant="plain"
                showRightArrow={false}
                selectedValueMode="replace"
              />

              <YearBottomSheet ref={yearModalRef} onChange={yearRange => setYearRange(yearRange)} />
              <PriceBottomSheet ref={priceModalRef} onChange={priceRange => setPriceRange(priceRange)} />
            </View>

            <View className="flex-col rounded-lg bg-surface dark:bg-surface-dark">
              <CheckboxRectButton label="Непроданные" value={onlyUnsold} onPress={toggleOnlyUnsold} />
              <CheckboxRectButton label="Только с фото" value={onlyWithPhotos} onPress={toggleOnlyWithPhotos} />
              <CheckboxRectButton label="Документы" value={false} onPress={() => {}} />
              <CheckboxRectButton label="Повреждения" value={false} onPress={() => {}} />
            </View>

            <View className="flex-col rounded-lg bg-surface p-2 dark:bg-surface-dark">
              <TouchableHighlightRow
                label="Коробка передач"
                onPress={handlePresentTransmissionModalPress}
                showRightArrow
                variant="bordered"
                selectedValue={transmission?.map(t => t.label).join(', ')}
                rightIcon="chevron-down"
              />
              <TouchableHighlightRow
                label="Объем двигателя"
                onPress={handlePresentEngineCapacityModalPress}
                showRightArrow
                variant="bordered"
                selectedValue={getEngineCapacityDisplayValue(store)}
                rightIcon="chevron-down"
              />
              <TouchableHighlightRow
                label="Мощность"
                onPress={handlePresentPowerModalPress}
                showRightArrow
                variant="bordered"
                selectedValue={getPowerDisplayValue(store)}
                rightIcon="chevron-down"
              />
              <TouchableHighlightRow
                label="Топливо"
                onPress={handlePresentFuelTypeModalPress}
                showRightArrow
                variant="bordered"
                selectedValue={fuelType?.map(t => t.label).join(', ')}
                rightIcon="chevron-down"
              />
              <TouchableHighlightRow
                label="Привод"
                onPress={handlePresentDrivetrainModalPress}
                showRightArrow
                variant="bordered"
                selectedValue={drivetrain?.map(t => t.label).join(', ')}
                rightIcon="chevron-down"
              />
              <TouchableHighlightRow label="Расположения руля" onPress={() => {}} showRightArrow variant="bordered" rightIcon="chevron-down" />

              <TouchableHighlightRow
                label="Пробег"
                onPress={handlePresentMileageModalPress}
                showRightArrow
                variant="bordered"
                selectedValue={getMileageDisplayValue(store)}
                rightIcon="chevron-down"
              />
              <TouchableHighlightRow
                label="Кузов"
                onPress={handlePresentBodyTypeModalPress}
                showRightArrow
                variant="bordered"
                selectedValue={bodyType?.map(t => t.label).join(', ')}
                rightIcon="chevron-down"
              />
              <TouchableHighlightRow
                label="Цвет"
                onPress={handlePresentColorModalPress}
                showRightArrow
                variant="plain"
                selectedValue={color?.map(c => c.label).join(', ')}
                rightIcon="chevron-down"
              />
            </View>

            <View className="flex-col rounded-lg bg-surface p-2 dark:bg-surface-dark">
              <TouchableHighlightRow
                label="Количество владельцев"
                onPress={handlePresentNumberOfOwnersModalPress}
                showRightArrow
                variant="bordered"
                selectedValue={numberOfOwners?.map(t => t.label).join(', ')}
                rightIcon="chevron-down"
              />
              <TouchableHighlightRow
                label="Продавец"
                onPress={handlePresentSellerModalPress}
                showRightArrow
                variant="plain"
                selectedValue={seller?.map(s => s.label).join(', ')}
                rightIcon="chevron-down"
              />
            </View>
          </View>
        </ScrollView>

        <View className="absolute bottom-14 left-0 right-0 items-center">
          <View className="px-4 py-8">
            <CustomRectButton
              onPress={() => router.replace('/(app)/search-screen/simple-auto-screen/(modals)/simple-auto-modal')}
              appearance="primary"
            >
              <Text className="text-center font-semibold text-white">Показать объявления</Text>
            </CustomRectButton>
          </View>
        </View>

        <RegionBottomSheet
          ref={regionBottomSheetRef}
          multiple
          selectedRegions={selectedRegions}
          onChange={regions => setSelectedRegions(Array.isArray(regions) ? regions : [regions])}
        />

        <TransmissionFilterBottomSheet
          ref={transmissionModalRef}
          onChange={options => {
            setTransmission(options);
          }}
        />

        <FuelTypeFilterBottomSheet
          ref={fuelTypeModalRef}
          onChange={options => {
            setFuelType(options);
          }}
        />

        <DrivetrainFilterBottomSheet
          ref={drivetrainModalRef}
          onChange={options => {
            setDrivetrain(options);
          }}
        />

        <MileageFilterBottomSheet ref={mileageModalRef} onChange={range => setMileageRange(range)} />

        <BodyTypeFilterBottomSheet
          ref={bodyTypeModalRef}
          onChange={options => {
            setBodyType(options);
          }}
        />

        <ColorFilterBottomSheet
          ref={colorModalRef}
          onChange={options => {
            setColor(options);
          }}
        />

        <NumberOfOwnersFilterBottomSheet
          ref={numberOfOwnersModalRef}
          onChange={options => {
            setNumberOfOwners(options);
          }}
        />

        <SellerFilterBottomSheet
          ref={sellerModalRef}
          onChange={options => {
            setSeller(options);
          }}
        />
        <EngineCapacityFilterBottomSheet ref={engineCapacityModalRef} onChange={range => setEngineCapacityRange(range)} />
        <PowerFilterBottomSheet ref={powerModalRef} onChange={range => setPowerRange(range)} />
      </SafeAreaView>
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
