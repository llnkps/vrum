import CustomBottomSheetModal from "@/components/global/CustomBottomSheetModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { Text, View } from "react-native";

export type BottomSheetRef = BottomSheetModal;

type props = {
  /** Custom snap points (default: ['50%']) */
  snapPoints?: string[];
  /** Optional title at the top */
  title?: string;
  /** Content to render inside the bottom sheet */
};

export const CurrencyModal = forwardRef<BottomSheetRef, props>((props, ref) => {
  return (
    <CustomBottomSheetModal ref={ref} snapPoints={["60%"]}>
      <View className="p-4 flex-col gap-y-4">
        <View className="p-2 rounded-md bg-background-neutral-subtle-pressed dark:bg-background-neutral-subtle-dark-pressed">
          <Text className="text-font dark:text-font-dark text-lg">
            Все регионы
          </Text>
        </View>

        <View className="p-2 rounded-md">
          <Text className="text-font dark:text-font-dark text-lg">Кишинев</Text>
        </View>

        <View className="p-2 rounded-md">
          <Text className="text-font dark:text-font-dark text-lg">Кишинев</Text>
        </View>

        <View className="p-2 rounded-md">
          <Text className="text-font dark:text-font-dark text-lg">Кишинев</Text>
        </View>

        <View className="p-2 rounded-md">
          <Text className="text-font dark:text-font-dark text-lg">Кишинев</Text>
        </View>
      </View>
    </CustomBottomSheetModal>
  );
});

CurrencyModal.displayName = "CurrencyModal";

