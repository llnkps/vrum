

import CustomBottomSheetModal, {
  BottomSheetRef,
} from "@/components/global/CustomBottomSheetModal";
import { CustomRectButton } from "@/components/ui/button";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";

type NumberOfOwnersModalProps = {
  onSelect: (value: number) => void;
};

const NumberOfOwnersModal = forwardRef<BottomSheetRef, NumberOfOwnersModalProps>(
  ({ onSelect }, ref) => {
    const [value, setValue] = React.useState<number | undefined>(undefined);

    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={["60%"]}
        enableContentPanningGesture={true}
      >
        <BottomSheetView className="flex-col gap-y-2 p-4">
          <input
            type="number"
            value={value ?? ""}
            onChange={e => setValue(Number(e.target.value) || undefined)}
            className="p-2 border rounded mb-2"
            placeholder="Количество владельцев"
          />
          <CustomRectButton
            title="Выбрать"
            onPress={() => value !== undefined && onSelect(value)}
            isSelected={false}
          />
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);
NumberOfOwnersModal.displayName = "NumberOfOwnersModal";

export default NumberOfOwnersModal;
