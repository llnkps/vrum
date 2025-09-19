import CloseIcon from "@/components/global/CloseIcon";
import CustomBottomSheetModal from "@/components/global/CustomBottomSheetModal";
import CustomWheelPicker from "@/components/global/CustomWheelPicker";
import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import {
  PickerItem,
  ValueChangedEvent,
} from "@quidone/react-native-wheel-picker";
import React, { forwardRef, useCallback, useState } from "react";
import { StyleSheet, Vibration, View } from "react-native";
import { Text } from "react-native-gesture-handler";

export type BottomSheetRef = BottomSheetModal;

type props = {
  /** Custom snap points (default: ['50%']) */
  snapPoints?: string[];
  /** Optional title at the top */
  title?: string;
  /** Content to render inside the bottom sheet */
};

const years = [...Array(100).keys()].map((index) => ({
  value: 2025 - index,
  label: (2025 - index).toString(),
}));

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const PriceModal = forwardRef<BottomSheetRef, props>((props, ref) => {

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={["40%"]}
    >
      <View className="flex-row justify-center gap-x-10">
        <View>
          <BottomSheetTextInput className="bg-background-input w-full" />
        </View>

        <View>
          <BottomSheetTextInput className="bg-background-input w-full" />
        </View>
      </View>
    </CustomBottomSheetModal>
  );
});

PriceModal.displayName = "PriceModal";

export default PriceModal;
