import CustomBottomSheetModal, {
  BottomSheetRef,
} from "@/components/global/CustomBottomSheetModal";
import { CustomRectButton } from "@/components/ui/button";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { HeaderHandle } from "./header";

type TransmissionOptionType = (typeof options)[number];

type props = {
  onSelect: (value: TransmissionOptionType) => void;
};

const options = [
  { label: "Механика", value: "manual" },
  { label: "Автомат", value: "automatic" },
  { label: "Робот", value: "robot" },
  { label: "Вариатор (CVT)", value: "cvt" },
];

const TransmissionModal = forwardRef<BottomSheetRef, props>(
  ({ onSelect }, ref) => {
    const [selectedBodyType, setSelectedBodyType] = React.useState<
      string | undefined
    >(undefined);

    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={["35%"]}
        handleComponent={HeaderHandle}
        enableContentPanningGesture={true}
      >
        <BottomSheetView className="flex-col">
          {options.map((opt) => (
            <CustomRectButton
              key={opt.value}
              onPress={() => {
                onSelect(opt);
                setSelectedBodyType(opt.value);
              }}
              title={opt.label}
              isSelected={selectedBodyType === opt.value}
            />
          ))}
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);
TransmissionModal.displayName = "TransmissionModal";

export default TransmissionModal;
