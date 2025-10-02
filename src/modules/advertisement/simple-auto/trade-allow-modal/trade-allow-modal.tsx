
import React, { forwardRef } from "react";
import CustomBottomSheetModal, { BottomSheetRef } from "@/components/global/CustomBottomSheetModal";
import { View, Text, Pressable } from "react-native";
import { HeaderHandle } from "./header";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { CustomRectButton } from "@/components/ui/button";

type TradeOptionType = (typeof options)[number];

type TradeAllowModalProps = {
  onSelect: (value: TradeOptionType) => void;
};

const options = [
  { label: "Торг возможен", value: "trade_allow" },
  { label: "Без торга", value: "trade_disallow" },
];

const TradeAllowModal = forwardRef<BottomSheetRef, TradeAllowModalProps>(({ onSelect }, ref) => {
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
});
TradeAllowModal.displayName = "TradeAllowModal";

export default TradeAllowModal;
