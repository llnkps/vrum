import CustomBottomSheetModal from "@/components/global/CustomBottomSheetModal";
import { CustomRectButton } from "@/components/ui/button";
import { useRegionApi } from "@/hooks/useRegionApi";
import { GetRegionIndex200ResponseInner } from "@/openapi/client";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { HeaderHandle } from "./header";

export type BottomSheetRef = BottomSheetModal;

type props = {
  /** Custom snap points (default: ['50%']) */
  snapPoints?: string[];
  /** Optional title at the top */
  title?: string;
  /** Content to render inside the bottom sheet */

  onChange: (region: GetRegionIndex200ResponseInner) => void;
};

export const RegionModal = forwardRef<BottomSheetRef, props>((props, ref) => {
  const { data: regions } = useRegionApi();
  const [selectedRegion, setSelectedRegion] = React.useState<
    string | undefined
  >(undefined);

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={["60%"]}
      handleComponent={HeaderHandle}
      enableContentPanningGesture={true}
    >
      <BottomSheetScrollView className="flex-col">
        {regions?.map((region) => (
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
    </CustomBottomSheetModal>
  );
});

RegionModal.displayName = "RegionModal";
