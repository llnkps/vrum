import CustomBottomSheetModal from "@/components/global/CustomBottomSheetModal";
import { CheckboxRectButton } from "@/components/global/CheckboxRectButton";
import { CustomRectButton } from "@/components/ui/button";
import { useRegionApi } from "@/hooks/useRegionApi";
import { GetRegionIndex200ResponseInner } from "@/openapi/client";
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { ActivityIndicator, Text } from "react-native";

export type BottomSheetRef = BottomSheetModal;

type props = {
  multiple?: boolean;
  onChange?: (region: GetRegionIndex200ResponseInner | GetRegionIndex200ResponseInner[]) => void;
};

export const RegionBottomSheet = forwardRef<BottomSheetRef, props>((props, ref) => {
  const { data: regions, isLoading, error } = useRegionApi();
  const [selectedRegions, setSelectedRegions] = React.useState<GetRegionIndex200ResponseInner[]>(
    props.multiple ? [] : []
  );
  const [selectedRegion, setSelectedRegion] = React.useState<GetRegionIndex200ResponseInner | undefined>(
    undefined
  );

  const handleRegionToggle = (region: GetRegionIndex200ResponseInner) => {
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

  const isRegionSelected = (region: GetRegionIndex200ResponseInner) => {
    if (props.multiple) {
      return selectedRegions.some(r => r.id === region.id);
    } else {
      return selectedRegion?.id === region.id;
    }
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={["60%"]}
      enableContentPanningGesture={true}
      title={props.multiple ? "Выберите регионы" : "Выберите регион"}
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      {isLoading && <ActivityIndicator size="large" />}
      {error ? (
        <BottomSheetView className="flex-1 justify-center items-center">
          <Text className="text-font dark:text-font-dark">
            Произошла ошибка. Приносим извинения!
          </Text>
        </BottomSheetView>
      ) : (
        <BottomSheetScrollView className="flex-col" enableFooterMarginAdjustment={true}>
          {regions?.map((region) => {
            if (props.multiple) {
              return (
                <CheckboxRectButton
                  key={region.id}
                  label={region.name || ""}
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

RegionBottomSheet.displayName = "RegionBottomSheet";
