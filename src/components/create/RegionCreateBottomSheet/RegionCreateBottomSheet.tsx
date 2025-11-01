import CustomBottomSheetModal from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { useRegionApi } from '@/hooks/api/useRegionApi';
import { Region } from '@/openapi/client';
import { BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { FC, forwardRef, useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';

export type BottomSheetRef = BottomSheetModal;

type RegionCreateModalProps = {
  value: string;
  setSelectedLabel: (label: string) => void;
  onChange: (region: Region) => void;
};

export const RegionCreateBottomSheet = forwardRef<BottomSheetRef, RegionCreateModalProps>((props, ref) => {
  const [selectedRegion, setSelectedRegion] = React.useState<Region | undefined>(undefined);

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
  };

  const handleConfirm = () => {
    if (selectedRegion) {
      props.onChange?.(selectedRegion);
    }
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
        value={props.value}
        setSelectedLabel={props.setSelectedLabel}
        onRegionSelect={handleRegionSelect}
        isRegionSelected={isRegionSelected}
      />
    </CustomBottomSheetModal>
  );
});

RegionCreateBottomSheet.displayName = 'RegionCreateBottomSheet';

type RegionListProps = {
  value: string;
  setSelectedLabel: (label: string) => void;
  onRegionSelect: (region: Region) => void;
  isRegionSelected: (region: Region) => boolean;
};

const RegionList: FC<RegionListProps> = ({ value, setSelectedLabel, onRegionSelect, isRegionSelected }) => {
  const { data: regions, isLoading, error } = useRegionApi();

  useEffect(() => {
    const selectedRegion = regions?.find(region => region.slug === value);
    if (selectedRegion) {
      setSelectedLabel(selectedRegion.name);
    }
  }, [regions, value, setSelectedLabel]);

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
        <CustomRectButton key={region.id} title={region.name || ''} isSelected={isRegionSelected(region)} onPress={() => onRegionSelect(region)} />
      ))}
    </BottomSheetScrollView>
  );
};
