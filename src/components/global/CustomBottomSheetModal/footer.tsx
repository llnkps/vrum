import React, { memo, useCallback } from "react";
import { View } from "react-native";
import {
  BottomSheetFooter,
  BottomSheetFooterProps,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomRectButton } from "@/components/ui/button";

interface DefaultFooterProps extends BottomSheetFooterProps {
  selectedValue?: any;
  onConfirm?: (value?: any) => void;
  onCancel?: () => void;
}

const DefaultFooterComponent = ({
  animatedFooterPosition,
  selectedValue,
  onConfirm,
  onCancel,
}: DefaultFooterProps) => {
  const { bottom: bottomSafeArea } = useSafeAreaInsets();
  const { dismiss } = useBottomSheetModal();

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
    dismiss();
  }, [dismiss, onCancel]);

  const handleConfirm = useCallback(() => {
    if (onConfirm) {
      onConfirm(selectedValue);
    }
    dismiss();
  }, [dismiss, onConfirm, selectedValue]);

  return (
    <BottomSheetFooter
      bottomInset={bottomSafeArea}
      animatedFooterPosition={animatedFooterPosition}
    >
      <View className="bg-surface dark:bg-surface-dark p-2">
        <View className="flex-row gap-x-3 justify-end">
          <CustomRectButton
            onPress={handleCancel}
            title="Отмена"
            appearance="subtle"
          />
          <CustomRectButton
            onPress={handleConfirm}
            title="Подтвердить"
          />
        </View>
      </View>
    </BottomSheetFooter>
  );
};

export const DefaultFooter = memo(DefaultFooterComponent);