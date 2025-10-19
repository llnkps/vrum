import CustomBottomSheetModal from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { useRegionApi } from '@/hooks/api/useRegionApi';
import { Region } from '@/openapi/client';
import { BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { ActivityIndicator, Text } from 'react-native';

export type BottomSheetRef = BottomSheetModal;

type RegionCreateModalProps = {
  onChange?: (region: Region | undefined) => void;
};

export const RegionCreateBottomSheet = forwardRef<BottomSheetRef, RegionCreateModalProps>((props, ref) => {
  const { data: regions, isLoading, error } = useRegionApi();
  const [selectedRegion, setSelectedRegion] = React.useState<Region | undefined>(undefined);

  const handleRegionToggle = (region: Region) => {
    setSelectedRegion(region);
  };

  const handleConfirm = () => {
    props.onChange?.(selectedRegion);
  };

  const isRegionSelected = (region: Region) => {
    return selectedRegion?.id === region.id;
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['60%']}
      enableContentPanningGesture={true}
      title={'Выберите регион'}
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView className="flex-1">
        {isLoading && <ActivityIndicator size="large" className="mt-4" />}
        {error && <Text className="mt-4 text-red-500">Ошибка загрузки регионов</Text>}
        {regions && (
          <BottomSheetScrollView>
            {regions.map(region => (
              <CustomRectButton
                key={region.id}
                title={region.name || ''}
                isSelected={isRegionSelected(region)}
                onPress={() => handleRegionToggle(region)}
              />
            ))}
          </BottomSheetScrollView>
        )}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});

RegionCreateBottomSheet.displayName = 'RegionCreateBottomSheet';
