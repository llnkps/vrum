import CustomBottomSheetModal from '@/components/global/CustomBottomSheetModal';
import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import { CustomRectButton } from '@/components/ui/button';
import { useRegionApi } from '@/hooks/api/useRegionApi';
import { Region } from '@/openapi/client';
import { BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';

export type BottomSheetRef = BottomSheetModal;

type props = {
  multiple?: boolean;
  selectedRegions?: Region[];
  onChange?: (region: Region | Region[]) => void;
};

export const RegionBottomSheet = forwardRef<BottomSheetRef, props>((props, ref) => {
  const { data: regions, isLoading, error } = useRegionApi();
  const [selectedRegions, setSelectedRegions] = React.useState<Region[]>(props.selectedRegions || []);
  const [selectedRegion, setSelectedRegion] = React.useState<Region | undefined>(
    props.multiple ? undefined : props.selectedRegions?.[0] || undefined
  );

  // Sync internal state with props when they change
  useEffect(() => {
    if (props.multiple) {
      setSelectedRegions(props.selectedRegions || []);
    } else {
      setSelectedRegion(props.selectedRegions?.[0] || undefined);
    }
  }, [props.selectedRegions, props.multiple]);

  const handleRegionToggle = (region: Region) => {
    if (props.multiple) {
      const isSelected = selectedRegions.some(r => r.id === region.id);
      if (isSelected) {
        setSelectedRegions(prev => prev.filter(r => r.id !== region.id));
      } else {
        setSelectedRegions(prev => [...prev, region]);
      }
    } else {
      setSelectedRegion(region);
    }
  };

  const handleConfirm = () => {
    if (props.multiple) {
      props.onChange?.(selectedRegions);
    } else if (selectedRegion) {
      props.onChange?.(selectedRegion);
    }
  };

  const isRegionSelected = (region: Region) => {
    if (props.multiple) {
      return selectedRegions.some(r => r.id === region.id);
    } else {
      return selectedRegion?.id === region.id;
    }
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['60%']}
      enableContentPanningGesture={true}
      title={props.multiple ? 'Выберите регионы' : 'Выберите регион'}
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      {isLoading && <ActivityIndicator size="large" />}
      {error ? (
        <BottomSheetView className="flex-1 items-center justify-center">
          <Text className="text-font dark:text-font-dark">Произошла ошибка. Приносим извинения!</Text>
        </BottomSheetView>
      ) : (
        <BottomSheetScrollView className="flex-col" enableFooterMarginAdjustment={true}>
          {regions?.map(region => {
            if (props.multiple) {
              return (
                <CheckboxRectButton
                  key={region.id}
                  label={region.name || ''}
                  value={isRegionSelected(region)}
                  onPress={() => handleRegionToggle(region)}
                />
              );
            } else {
              return (
                <CustomRectButton
                  key={region.id}
                  onPress={() => handleRegionToggle(region)}
                  title={region.name}
                  isSelected={isRegionSelected(region)}
                />
              );
            }
          })}
        </BottomSheetScrollView>
      )}
    </CustomBottomSheetModal>
  );
});

RegionBottomSheet.displayName = 'RegionBottomSheet';
