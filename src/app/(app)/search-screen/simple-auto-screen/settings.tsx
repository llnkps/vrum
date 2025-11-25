import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import CloseIcon from '@/components/global/CloseIcon';
import { SelectedRegionsBadges } from '@/components/global/SelectedItemsBadges';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { CustomRectButton, SelectableButton } from '@/components/ui/button';
import { selectSelectedBrands, selectSelectedGenerations, useSimpleAutoFilterStore } from '@/state/search-screen/useSimpleAutoFilterStore';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { SafeAreaView } from 'react-native-safe-area-context';

// Controller imports
import { BodyTypeFilterController } from '@/components/filters/BodyTypeFilterBottomSheet';
import { ColorFilterController } from '@/components/filters/ColorFilterBottomSheet';
import { DrivetrainFilterController } from '@/components/filters/DrivetrainFilterBottomSheet';
import { EngineCapacityFilterController } from '@/components/filters/EngineCapacityFilterBottomSheet';
import { FuelTypeFilterController } from '@/components/filters/FuelTypeFilterBottomSheet';
import { MileageFilterController } from '@/components/filters/MileageFilterBottomSheet';
import { NumberOfOwnersFilterController } from '@/components/filters/NumberOfOwnersFilterBottomSheet';
import { PowerFilterController } from '@/components/filters/PowerFilterBottomSheet';
import { PriceFilterController } from '@/components/filters/PriceFilterBottomSheet';
import { RegionFilterController } from '@/components/filters/RegionBottomSheet';
import { SellerFilterController } from '@/components/filters/SellerFilterBottomSheet';
import { TransmissionFilterController } from '@/components/filters/TransmissionFilterBottomSheet';
import { YearFilterController } from '@/components/filters/YearFilterBottomSheet';
import { ShowAdvertisementButton } from '@/modules/search-screen/simple-auto-tab/ShowAdvertisementButton';

const SettingScreenFilter = () => {
  const router = useRouter();

  const [isBrandSectionCollapsed, setIsBrandSectionCollapsed] = useState(true);

  const store = useSimpleAutoFilterStore();
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
  const selectedGenerations = selectSelectedGenerations(store);

  return (
    <>
      <SafeAreaView>
        <Header router={router} resetFilters={resetFilters} />
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View className="mt-2 gap-y-4 p-2">
            <View className="flex-row rounded-lg bg-surface dark:bg-surface-dark">
              <SelectableButton appearance="subtle" title="Все" isSelected={tab === 'all'} onPress={() => setTab('all')} />
              <SelectableButton appearance="subtle" title="С пробегом" isSelected={tab === 'old'} onPress={() => setTab('old')} />
              <SelectableButton appearance="subtle" title="Новые" isSelected={tab === 'new'} onPress={() => setTab('new')} />
            </View>

            <View className="gap-y-2">
              <RegionFilterController value={selectedRegions} onChange={setSelectedRegions} multiple />
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
                onPress={() => router.push('/(app)/search-screen/simple-auto-screen/brand-auto-filter?from=settings')}
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
                              onPress={() => router.push('/(app)/search-screen/simple-auto-screen/model-filter?from=settings')}
                              showRightArrow
                            />

                            {selectedModels.length > 0 && (
                              <TouchableHighlightRow
                                variant="button"
                                label="Поколение"
                                selectedValue={selectedGenerations.map(m => `${m.generation} поколение`).join(', ')}
                                selectedValueMode="replace"
                                onPress={() => router.push('/(app)/search-screen/simple-auto-screen/generation-filter?from=settings')}
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
              <YearFilterController value={store.yearRange} onChange={yearRange => setYearRange(yearRange)} variant="bordered" />

              <PriceFilterController value={store.priceRange} onChange={priceRange => setPriceRange(priceRange)} variant="plain" />
            </View>

            <View className="flex-col rounded-lg bg-surface dark:bg-surface-dark">
              <CheckboxRectButton label="Непроданные" value={onlyUnsold} onPress={toggleOnlyUnsold} />
              <CheckboxRectButton label="Только с фото" value={onlyWithPhotos} onPress={toggleOnlyWithPhotos} />
              <CheckboxRectButton label="Документы" value={false} onPress={() => {}} />
              <CheckboxRectButton label="Повреждения" value={false} onPress={() => {}} />
            </View>

            <View className="flex-col rounded-lg bg-surface p-2 dark:bg-surface-dark">
              <TransmissionFilterController selectedOptions={transmission} onChange={setTransmission} />
              <EngineCapacityFilterController value={store.engineCapacityRange} onChange={setEngineCapacityRange} />
              <PowerFilterController value={store.powerRange} onChange={setPowerRange} />
              <FuelTypeFilterController selectedOptions={fuelType} onChange={setFuelType} />
              <DrivetrainFilterController selectedOptions={drivetrain} onChange={setDrivetrain} />
              <TouchableHighlightRow label="Расположения руля" onPress={() => {}} showRightArrow variant="bordered" rightIcon="chevron-down" />

              <MileageFilterController value={store.mileageRange} onChange={setMileageRange} />
              <BodyTypeFilterController selectedOptions={bodyType} onChange={setBodyType} />
              <ColorFilterController selectedOptions={color} onChange={setColor} />
            </View>

            <View className="flex-col rounded-lg bg-surface p-2 dark:bg-surface-dark">
              <NumberOfOwnersFilterController selectedOptions={numberOfOwners} onChange={setNumberOfOwners} />
              <SellerFilterController selectedOptions={seller} onChange={setSeller} />
            </View>
          </View>
        </ScrollView>

        <View className="absolute bottom-14 left-0 right-0 items-center">
          <View className="px-4 py-8">
            <ShowAdvertisementButton />
          </View>
        </View>
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
