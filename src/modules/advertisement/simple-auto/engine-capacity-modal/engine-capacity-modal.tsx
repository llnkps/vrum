

import CustomBottomSheetModal, {
  BottomSheetRef,
} from "@/components/global/CustomBottomSheetModal";
import { CustomRectButton } from "@/components/ui/button";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";

type EngineCapacityModalProps = {
  onSelect: (value: number) => void;
};

const EngineCapacityModal = forwardRef<BottomSheetRef, EngineCapacityModalProps>(
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
            placeholder="Введите объем двигателя (л)"
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
EngineCapacityModal.displayName = "EngineCapacityModal";

export default EngineCapacityModal;
