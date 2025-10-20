import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import CustomBottomSheetModal from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { useRegionApi } from '@/hooks/api/useRegionApi';
import { Region } from '@/openapi/client';
import { BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { FC, forwardRef, useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';

export type BottomSheetRef = BottomSheetModal;

type RegionBottomSheetProps = {
  multiple?: boolean;
  selectedRegions?: Region[];
  onChange?: (region: Region | Region[]) => void;
};

export const RegionBottomSheet = forwardRef<BottomSheetRef, RegionBottomSheetProps>((props, ref) => {
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

  const handleRegionSelect = (region: Region) => {
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
      <RegionList
        multiple={props.multiple}
        onRegionSelect={handleRegionSelect}
        isRegionSelected={isRegionSelected}
      />
    </CustomBottomSheetModal>
  );
});

RegionBottomSheet.displayName = 'RegionBottomSheet';

type RegionListProps = {
  multiple?: boolean;
  onRegionSelect: (region: Region) => void;
  isRegionSelected: (region: Region) => boolean;
};

const RegionList: FC<RegionListProps> = ({ multiple, onRegionSelect, isRegionSelected }) => {
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
        <Text className="text-font dark:text-font-dark">Произошла ошибка. Приносим извинения!</Text>
      </BottomSheetView>
    );
  }

  return (
    <BottomSheetScrollView className="flex-col" enableFooterMarginAdjustment={true}>
      {regions?.map(region => {
        if (multiple) {
          return (
            <CheckboxRectButton
              key={region.id}
              label={region.name || ''}
              value={isRegionSelected(region)}
              onPress={() => onRegionSelect(region)}
            />
          );
        } else {
          return (
            <CustomRectButton
              key={region.id}
              onPress={() => onRegionSelect(region)}
              title={region.name}
              isSelected={isRegionSelected(region)}
            />
          );
        }
      })}
    </BottomSheetScrollView>
  );
};
