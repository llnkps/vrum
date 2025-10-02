

import CustomBottomSheetModal, {
  BottomSheetRef,
} from "@/components/global/CustomBottomSheetModal";
import { CustomRectButton } from "@/components/ui/button";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";

type PhotoModalProps = {
  onSelect: () => void;
};

const PhotoModal = forwardRef<BottomSheetRef, PhotoModalProps>(
  ({ onSelect }, ref) => {
    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={["60%"]}
        enableContentPanningGesture={true}
      >
        <BottomSheetView className="flex-col p-4">
          <CustomRectButton
            title="Загрузить фото"
            onPress={onSelect}
            isSelected={false}
          />
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);
PhotoModal.displayName = "PhotoModal";

export default PhotoModal;
