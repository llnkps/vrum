

import CustomBottomSheetModal, {
  BottomSheetRef,
} from "@/components/global/CustomBottomSheetModal";
import { CustomRectButton } from "@/components/ui/button";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";

type ConditionOption = (typeof options)[number];

type ConditionModalProps = {
  onSelect: (value: ConditionOption) => void;
};

const options = [
  { label: "Новый", value: "new" },
  { label: "Б/у", value: "used" },
  { label: "На запчасти", value: "for parts" },
];

const ConditionModal = forwardRef<BottomSheetRef, ConditionModalProps>(
  ({ onSelect }, ref) => {
    const [selectedCondition, setSelectedCondition] = React.useState<string | undefined>(undefined);

    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={["60%"]}
        enableContentPanningGesture={true}
      >
        <BottomSheetView className="flex-col">
          {options.map((opt) => (
            <CustomRectButton
              key={opt.value}
              onPress={() => {
                onSelect(opt);
                setSelectedCondition(opt.value);
              }}
              title={opt.label}
              isSelected={selectedCondition === opt.value}
            />
          ))}
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);
ConditionModal.displayName = "ConditionModal";

export default ConditionModal;
