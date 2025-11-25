import { CustomRectButton } from '@/components/ui/button';
import { CustomTheme } from '@/theme';
import { BottomSheetFooter, BottomSheetFooterProps, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface DefaultFooterProps extends BottomSheetFooterProps {
  selectedValue?: any;
  onConfirm?: (value?: any) => void;
  onCancel?: () => void;
}

const DefaultFooterComponent = ({ animatedFooterPosition, selectedValue, onConfirm, onCancel }: DefaultFooterProps) => {
  const { bottom: bottomSafeArea } = useSafeAreaInsets();
  const { dismiss } = useBottomSheetModal();
  const theme = useTheme() as CustomTheme;
  const { t } = useTranslation();

  const themedStyles = StyleSheet.create({
    footer: {
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 10,
    },
    content: {
      paddingBottom: Math.max(bottomSafeArea, 16), // to close gap with safe area
    },
    buttonContainer: {
      width: '100%',
      padding: 8, // p-2
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 12, // gap-x-3
    },
  });

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
    <BottomSheetFooter animatedFooterPosition={animatedFooterPosition} style={themedStyles.footer}>
      <View style={themedStyles.content} pointerEvents="box-none">
        <View style={themedStyles.buttonContainer} pointerEvents="auto">
          <View style={themedStyles.buttonRow}>
            <CustomRectButton onPress={handleCancel} title={t('common.cancel')} appearance="subtle" />
            <CustomRectButton onPress={handleConfirm} title={t('common.confirm')} />
          </View>
        </View>
      </View>
    </BottomSheetFooter>
  );
};

export const DefaultFooter = memo(DefaultFooterComponent);

// Export a function that creates the footer content for custom positioning
export const createCustomFooter = (props: DefaultFooterProps) => <DefaultFooterComponent {...props} />;
