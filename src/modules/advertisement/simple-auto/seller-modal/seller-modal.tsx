

import CustomBottomSheetModal, {
  BottomSheetRef,
} from "@/components/global/CustomBottomSheetModal";
import { CustomRectButton } from "@/components/ui/button";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";

type SellerModalProps = {
  onSelect: (value: string) => void;
};

const SellerModal = forwardRef<BottomSheetRef, SellerModalProps>(
  ({ onSelect }, ref) => {
    const [value, setValue] = React.useState<string>("");

    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={["60%"]}
        enableContentPanningGesture={true}
      >
        <BottomSheetView className="flex-col gap-y-2 p-4">
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            className="p-2 border rounded mb-2"
            placeholder="Введите имя продавца"
          />
          <CustomRectButton
            title="Выбрать"
            onPress={() => onSelect(value)}
            isSelected={false}
          />
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);
SellerModal.displayName = "SellerModal";

export default SellerModal;
