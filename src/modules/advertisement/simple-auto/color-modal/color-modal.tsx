

import CustomBottomSheetModal, {
  BottomSheetRef,
} from "@/components/global/CustomBottomSheetModal";
import { CustomRectButton } from "@/components/ui/button";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";

type ColorOption = (typeof options)[number];

type ColorModalProps = {
  onSelect: (value: ColorOption) => void;
};

const options = [
  { label: "Черный", value: "black" },
  { label: "Белый", value: "white" },
  { label: "Серый", value: "gray" },
  { label: "Красный", value: "red" },
  { label: "Синий", value: "blue" },
  { label: "Зеленый", value: "green" },
  { label: "Желтый", value: "yellow" },
  { label: "Другой", value: "other" },
];

const ColorModal = forwardRef<BottomSheetRef, ColorModalProps>(
  ({ onSelect }, ref) => {
    const [selectedColor, setSelectedColor] = React.useState<string | undefined>(undefined);

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
                setSelectedColor(opt.value);
              }}
              title={opt.label}
              isSelected={selectedColor === opt.value}
            />
          ))}
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);
ColorModal.displayName = "ColorModal";

export default ColorModal;
