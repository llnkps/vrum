import CustomBottomSheetModal from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { useRegionApi } from '@/hooks/api/useRegionApi';
import { GetRegionIndex200ResponseInner } from '@/openapi/client';
import { BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { ActivityIndicator, Text } from 'react-native';

export type BottomSheetRef = BottomSheetModal;

type props = {
  onChange: (region: GetRegionIndex200ResponseInner) => void;
};

export const RegionModal = forwardRef<BottomSheetRef, props>((props, ref) => {
  const { data: regions, isLoading, error } = useRegionApi();
  const [selectedRegion, setSelectedRegion] = React.useState<string | undefined>(undefined);

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['60%']}
      enableContentPanningGesture={true}
      title={'Выберите регион'}
    >
      {isLoading && <ActivityIndicator size="large" />}
      {error ? (
        <BottomSheetView className="flex-1 items-center justify-center">
          <Text className="text-font dark:text-font-dark">
            Произошла ошибка. Приносим извинения!
          </Text>
        </BottomSheetView>
      ) : (
        <BottomSheetScrollView className="flex-col">
          {regions?.map(region => (
            <CustomRectButton
              key={region.id}
              onPress={() => {
                props.onChange(region);
                setSelectedRegion(region.slug);
              }}
              title={region.name}
              isSelected={selectedRegion === region.slug}
            />
          ))}
        </BottomSheetScrollView>
      )}
    </CustomBottomSheetModal>
  );
});

RegionModal.displayName = 'RegionModal';
