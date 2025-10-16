import React, { memo, useCallback } from "react";
import { View } from "react-native";
import {
  BottomSheetFooter,
  BottomSheetFooterProps,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/theme";
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
  const theme = useTheme() as CustomTheme;

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
      animatedFooterPosition={animatedFooterPosition}
      style={{
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 10,
      }}
    >
      <View 
        style={{
          paddingBottom: Math.max(bottomSafeArea, 16),
        }}
      >
        <View className="p-2 w-full">
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
      </View>
    </BottomSheetFooter>
  );
};

export const DefaultFooter = memo(DefaultFooterComponent);

// Export a function that creates the footer content for custom positioning
export const createCustomFooter = (props: DefaultFooterProps) => <DefaultFooterComponent {...props} />;