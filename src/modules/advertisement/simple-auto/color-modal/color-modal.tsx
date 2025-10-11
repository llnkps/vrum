import CustomBottomSheetModal, {
  BottomSheetRef,
} from "@/components/global/CustomBottomSheetModal";
import { CustomRectButton } from "@/components/ui/button";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { Text, View } from "react-native";

type ColorOption = (typeof options)[number];

type ColorModalProps = {
  onSelect: (value: ColorOption) => void;
};

const options = [
  { label: "Черный", value: "black", color: "#000000" },
  { label: "Белый", value: "white", color: "#FFFFFF" },
  { label: "Серый", value: "gray", color: "#808080" },
  { label: "Красный", value: "red", color: "#FF0000" },
  { label: "Синий", value: "blue", color: "#0000FF" },
  { label: "Зеленый", value: "green", color: "#008000" },
  { label: "Желтый", value: "yellow", color: "#FFFF00" },
  { label: "Другой", value: "other", color: "#CCCCCC" },
];

const ColorModal = forwardRef<BottomSheetRef, ColorModalProps>(
  ({ onSelect }, ref) => {
    const [selectedColor, setSelectedColor] = React.useState<
      string | undefined
    >(undefined);

    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={["60%"]}
        enableContentPanningGesture={true}
        title="Цвет"
      >
        <BottomSheetView className="flex-col">
          {options.map((option) => (
            <CustomRectButton
              key={option.value}
              onPress={() => {
                onSelect(option);
                setSelectedColor(option.value);
              }}
              isSelected={selectedColor === option.value}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 16,
                paddingHorizontal: 20,
              }}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 4,
                  backgroundColor: option.color,
                  marginRight: 16,
                  borderWidth: option.value === "white" ? 1 : 0,
                  borderColor: "#E5E5E5",
                }}
              />
              <Text className="text-font dark:text-font-dark">
                {option.label}
              </Text>
            </CustomRectButton>
          ))}
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);
ColorModal.displayName = "ColorModal";

export default ColorModal;
