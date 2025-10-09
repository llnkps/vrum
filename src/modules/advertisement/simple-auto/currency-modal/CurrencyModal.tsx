
import CustomBottomSheetModal, {
  BottomSheetRef,
} from "@/components/global/CustomBottomSheetModal";
import { CustomRectButton } from "@/components/ui/button";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";

type CurrencyOption = (typeof options)[number];

type CurrencyModalProps = {
  onSelect: (value: CurrencyOption) => void;
};

const options = [
  { label: "MDL", value: "mdl" },
  { label: "USD", value: "usd" },
  { label: "EUR", value: "eur" },
];

export const CurrencyModal = forwardRef<BottomSheetRef, CurrencyModalProps>(
  ({ onSelect }, ref) => {
    const [selectedCurrency, setSelectedCurrency] = React.useState<string | undefined>(undefined);

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
                setSelectedCurrency(opt.value);
              }}
              title={opt.label}
              isSelected={selectedCurrency === opt.value}
            />
          ))}
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);
CurrencyModal.displayName = "CurrencyModal";

