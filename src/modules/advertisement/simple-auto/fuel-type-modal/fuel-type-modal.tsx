

import CustomBottomSheetModal, {
  BottomSheetRef,
} from "@/components/global/CustomBottomSheetModal";
import { CustomRectButton } from "@/components/ui/button";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";

type FuelTypeOption = (typeof options)[number];

type FuelTypeModalProps = {
  onSelect: (value: FuelTypeOption) => void;
};

const options = [
  { label: "Бензин", value: "petrol" },
  { label: "Дизель", value: "diesel" },
  { label: "Электро", value: "electric" },
  { label: "Гибрид", value: "hybrid" },
  { label: "Газ", value: "gas" },
];

const FuelTypeModal = forwardRef<BottomSheetRef, FuelTypeModalProps>(
  ({ onSelect }, ref) => {
    const [selectedFuelType, setSelectedFuelType] = React.useState<string | undefined>(undefined);

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
                setSelectedFuelType(opt.value);
              }}
              title={opt.label}
              isSelected={selectedFuelType === opt.value}
            />
          ))}
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);
FuelTypeModal.displayName = "FuelTypeModal";

export default FuelTypeModal;
