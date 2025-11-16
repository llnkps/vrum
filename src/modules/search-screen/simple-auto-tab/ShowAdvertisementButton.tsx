import { CustomRectButton } from '@/components/ui/button';
import { useAutoSelectStore } from '@/state/search-screen/useAutoSelectStore';
import { useSearchedFiltersStore } from '@/state/search-screen/useSearchedFiltersStore';
import { BACKEND_FILTERS, SelectFilterType } from '@/types/filter';
import { useFilterConfigs } from '@/shared/filter';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { createFilterFormatCallback, formatRangeFilterValue } from '@/utils/useTranslateRangeFilter';

export const ShowAdvertisementButton = React.memo(() => {
  const router = useRouter();
  const { t } = useTranslation();
  const searchParams = useLocalSearchParams();
  const { addSearchedItem } = useSearchedFiltersStore();
  const filterConfigs = useFilterConfigs();
  const {
    currentBrand,
    selectedModelsByBrand,
    selectedBrandsMap,
    onlyUnsold,
    onlyWithPhotos,
    transmission,
    fuelType,
    drivetrain,
    bodyType,
    color,
    condition,
    documentsOk,
    numberOfOwners,
    seller,
    tradeAllow,
    priceRange,
    yearRange,
    engineCapacityRange,
    powerRange,
    mileageRange,
  } = useAutoSelectStore();

  // Helper function to get labels for selected values from filter config
  const getLabelsForSelectedValues = (filterKey: string, selectedValues: SelectFilterType) => {
    const config = filterConfigs[filterKey as keyof typeof filterConfigs];
    if (!config || !config.options) return [];

    const selectedKeys = Object.values(selectedValues);
    return config.options
      .filter(option => selectedKeys.includes(String(option.value)))
      .map(option => option.label);
  };

  // Function to collect current filter data and save to searched filters
  const saveCurrentFiltersToSearched = () => {
    const filters: Record<string, any> = {};

    // Get selected brands and models
    const selectedBrands = Object.values(selectedBrandsMap);
    const selectedModels = selectedModelsByBrand[currentBrand?.id || 0] || [];

    // Logic for brand and model display:
    // 1. If one brand and one model: show both brand and model
    // 2. If multiple models: show only models (no brand)
    if (selectedBrands.length === 1 && selectedModels.length === 1) {
      // One brand and one model: show both
      filters[BACKEND_FILTERS.BRAND] = selectedBrands[0].name;
      filters[BACKEND_FILTERS.MODEL] = selectedModels[0].name;
    } else if (selectedModels.length > 1) {
      // Multiple models: show only models
      filters[BACKEND_FILTERS.MODEL] = selectedModels.map(m => m.name).join(', ');
    }

    // Add other filters - convert SelectFilterType to arrays of labels
    if (yearRange) {
      filters[BACKEND_FILTERS.YEAR] = formatRangeFilterValue(BACKEND_FILTERS.YEAR, yearRange, t, createFilterFormatCallback(BACKEND_FILTERS.YEAR));
    }
    if (priceRange) {
      filters[BACKEND_FILTERS.PRICE] = formatRangeFilterValue(BACKEND_FILTERS.PRICE, priceRange, t, createFilterFormatCallback(BACKEND_FILTERS.PRICE));
    }
    if (transmission && Object.keys(transmission).length > 0) {
      filters[BACKEND_FILTERS.TRANSMISSION] = getLabelsForSelectedValues(BACKEND_FILTERS.TRANSMISSION, transmission);
    }
    if (fuelType && Object.keys(fuelType).length > 0) {
      filters[BACKEND_FILTERS.FUEL_TYPE] = getLabelsForSelectedValues(BACKEND_FILTERS.FUEL_TYPE, fuelType);
    }
    if (drivetrain && Object.keys(drivetrain).length > 0) {
      filters[BACKEND_FILTERS.DRIVETRAIN_TYPE] = getLabelsForSelectedValues(BACKEND_FILTERS.DRIVETRAIN_TYPE, drivetrain);
    }
    if (bodyType && Object.keys(bodyType).length > 0) {
      filters[BACKEND_FILTERS.FRAME_TYPE] = getLabelsForSelectedValues(BACKEND_FILTERS.FRAME_TYPE, bodyType);
    }
    if (color && Object.keys(color).length > 0) {
      filters[BACKEND_FILTERS.COLOR] = getLabelsForSelectedValues(BACKEND_FILTERS.COLOR, color);
    }
    if (condition && Object.keys(condition).length > 0) {
      filters[BACKEND_FILTERS.CONDITION] = getLabelsForSelectedValues(BACKEND_FILTERS.CONDITION, condition);
    }
    if (documentsOk && Object.keys(documentsOk).length > 0) {
      filters[BACKEND_FILTERS.DOCUMENT_TYPE] = getLabelsForSelectedValues(BACKEND_FILTERS.DOCUMENT_TYPE, documentsOk);
    }
    if (numberOfOwners && Object.keys(numberOfOwners).length > 0) {
      filters[BACKEND_FILTERS.NUMBER_OF_OWNER] = getLabelsForSelectedValues(BACKEND_FILTERS.NUMBER_OF_OWNER, numberOfOwners);
    }
    if (seller && Object.keys(seller).length > 0) {
      filters[BACKEND_FILTERS.SELLER] = getLabelsForSelectedValues(BACKEND_FILTERS.SELLER, seller);
    }
    if (tradeAllow && Object.keys(tradeAllow).length > 0) {
      filters[BACKEND_FILTERS.TRADE_ALLOW] = getLabelsForSelectedValues(BACKEND_FILTERS.TRADE_ALLOW, tradeAllow);
    }
    if (engineCapacityRange) {
      filters[BACKEND_FILTERS.ENGINE_CAPACITY] = formatRangeFilterValue(BACKEND_FILTERS.ENGINE_CAPACITY, engineCapacityRange, t, createFilterFormatCallback(BACKEND_FILTERS.ENGINE_CAPACITY));
    }
    if (powerRange) {
      filters[BACKEND_FILTERS.POWER] = formatRangeFilterValue(BACKEND_FILTERS.POWER, powerRange, t, createFilterFormatCallback(BACKEND_FILTERS.POWER));
    }
    if (mileageRange) {
      filters[BACKEND_FILTERS.MILEAGE] = formatRangeFilterValue(BACKEND_FILTERS.MILEAGE, mileageRange, t, createFilterFormatCallback(BACKEND_FILTERS.MILEAGE));
    }
    if (onlyUnsold) {
      filters[BACKEND_FILTERS.UNSOLD] = true;
    }
    if (onlyWithPhotos) {
      filters[BACKEND_FILTERS.WITH_IMAGE] = true;
    }

    console.log(filters, transmission)
    // Only save if there are actual filters
    if (Object.keys(filters).length > 0) {
      addSearchedItem({ filters });
    }
  };

  return (
    <CustomRectButton
      onPress={() => {
        // Save current filters to searched filters store
        // saveCurrentFiltersToSearched();

        // Navigate based on source
        if (searchParams.from === 'settings') {
          router.replace('/(app)/search-screen/simple-auto-screen/(modals)/settings');
        } else {
          router.replace('/(app)/search-screen/simple-auto-screen/(modals)/simple-auto-modal');
        }
      }}
      appearance="primary"
    >
      <Text className="text-center font-semibold text-white">{t('searchScreen.simpleAuto.searchPlaceholder')}</Text>
    </CustomRectButton>
  );
});

ShowAdvertisementButton.displayName = 'ShowAdvertisementButton';
