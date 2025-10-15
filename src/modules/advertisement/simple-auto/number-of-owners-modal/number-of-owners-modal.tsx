import CustomBottomSheetModal, {
  BottomSheetRef,
} from "@/components/global/CustomBottomSheetModal";
import { CustomRectButton } from "@/components/ui/button";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";

type OptionType = (typeof options)[number];

const options = [
  { label: "Один", value: "one" },
  { label: "Два", value: "up_to_two" },
  { label: "Три", value: "up_to_three" },
  { label: "Больше трех", value: "more_than_three" },
];


type NumberOfOwnersModalProps = {
  onSelect: (value: OptionType) => void;
};

const NumberOfOwnersModal = forwardRef<
  BottomSheetRef,
  NumberOfOwnersModalProps
>(({ onSelect }, ref) => {
  const [value, setValue] = React.useState<string | undefined>(undefined);

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={["33%"]}
      enableContentPanningGesture={true}
      title={"Количество владельцев"}
    >
      <BottomSheetView className="flex-col">
        {options.map((opt) => (
          <CustomRectButton
            key={opt.value}
            onPress={() => {
              onSelect(opt);
              setValue(opt.value);
            }}
            title={opt.label}
            isSelected={value === opt.value}
          />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
NumberOfOwnersModal.displayName = "NumberOfOwnersModal";

export default NumberOfOwnersModal;
