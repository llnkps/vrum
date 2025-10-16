import CustomBottomSheetModal from "@/components/global/CustomBottomSheetModal";
import { BottomSheetField } from "@/components/ui/input/BottomSheetField/BottomSheetField";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-gesture-handler";

export type BottomSheetRef = BottomSheetModal;

type YearModalProps = {
  onChange?: (year: { min?: number; max?: number }) => void;
};

export const YearBottomSheet = forwardRef<BottomSheetRef, YearModalProps>((props, ref) => {
  const [minYear, setMinYear] = useState<string>("");
  const [maxYear, setMaxYear] = useState<string>("");

  const handleConfirm = () => {
    const min = minYear ? parseInt(minYear) : undefined;
    const max = maxYear ? parseInt(maxYear) : undefined;
    props.onChange?.({ min, max });
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={["30%"]}
      footerProps={{
        onConfirm: handleConfirm,
      }}
      title="Год выпуска"
    >
      <BottomSheetView>
        <View className="pt-5 flex-row items-center justify-center gap-x-10 px-4">
          <View className="flex-1">
            <Text className="font-bold text-lg text-font dark:text-font-dark">От</Text>
            <BottomSheetField keyboardType="numeric" value={minYear} onChangeText={setMinYear} autoFocus placeholder="2020" />
          </View>

          <View className="flex-1">
            <Text className="font-bold text-lg text-font dark:text-font-dark">До</Text>
            <BottomSheetField keyboardType="numeric" value={maxYear} onChangeText={setMaxYear} autoFocus placeholder="2025" />
          </View>
        </View>
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});

YearBottomSheet.displayName = "YearBottomSheet";
