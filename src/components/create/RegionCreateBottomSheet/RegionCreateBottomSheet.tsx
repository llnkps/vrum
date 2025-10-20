import CustomBottomSheetModal from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { useRegionApi } from '@/hooks/api/useRegionApi';
import { Region } from '@/openapi/client';
import { BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { FC, forwardRef } from 'react';
import { ActivityIndicator, Text } from 'react-native';

export type BottomSheetRef = BottomSheetModal;

type RegionCreateModalProps = {
  onChange?: (region: Region | undefined) => void;
};

export const RegionCreateBottomSheet = forwardRef<BottomSheetRef, RegionCreateModalProps>((props, ref) => {
  const [selectedRegion, setSelectedRegion] = React.useState<Region | undefined>(undefined);

  const handleRegionSelect = (region: Region) => {
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
      <RegionList
        onRegionSelect={handleRegionSelect}
        isRegionSelected={isRegionSelected}
      />
    </CustomBottomSheetModal>
  );
});

RegionCreateBottomSheet.displayName = 'RegionCreateBottomSheet';

type RegionListProps = {
  onRegionSelect: (region: Region) => void;
  isRegionSelected: (region: Region) => boolean;
};

const RegionList: FC<RegionListProps> = ({ onRegionSelect, isRegionSelected }) => {
  const { data: regions, isLoading, error } = useRegionApi();

  if (isLoading) {
    return (
      <BottomSheetView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </BottomSheetView>
    );
  }

  if (error) {
    return (
      <BottomSheetView className="flex-1 items-center justify-center">
        <Text className="text-red-500">Ошибка загрузки регионов</Text>
      </BottomSheetView>
    );
  }

  return (
    <BottomSheetScrollView enableFooterMarginAdjustment={true}>
      {regions?.map(region => (
        <CustomRectButton
          key={region.id}
          title={region.name || ''}
          isSelected={isRegionSelected(region)}
          onPress={() => onRegionSelect(region)}
        />
      ))}
    </BottomSheetScrollView>
  );
};
