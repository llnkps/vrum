

import CustomBottomSheetModal, {
  BottomSheetRef,
} from "@/components/global/CustomBottomSheetModal";
import { CustomRectButton } from "@/components/ui/button";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";

type DrivetrainOption = (typeof options)[number];

type DrivetrainModalProps = {
  onSelect: (value: DrivetrainOption) => void;
};

const options = [
  { label: "Передний (FWD)", value: "front" },
  { label: "Задний (RWD)", value: "rear" },
  { label: "4x4", value: "4wd" },
];

const DrivetrainModal = forwardRef<BottomSheetRef, DrivetrainModalProps>(
  ({ onSelect }, ref) => {
    const [selectedDrivetrain, setSelectedDrivetrain] = React.useState<string | undefined>(undefined);

    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={["30%"]}
        enableContentPanningGesture={true}
        title="Привод"
      >
        <BottomSheetView className="flex-col">
          {options.map((opt) => (
            <CustomRectButton
              key={opt.value}
              onPress={() => {
                onSelect(opt);
                setSelectedDrivetrain(opt.value);
              }}
              title={opt.label}
              isSelected={selectedDrivetrain === opt.value}
            />
          ))}
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);
DrivetrainModal.displayName = "DrivetrainModal";

export default DrivetrainModal;
