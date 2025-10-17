import CustomBottomSheetModal from '@/components/global/CustomBottomSheetModal';
import { BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { CustomFooter } from './footer';
import { HeaderHandle } from './header';

export type BottomSheetRef = BottomSheetModal;

type props = {
  /** Custom snap points (default: ['50%']) */
  snapPoints?: string[];
  /** Optional title at the top */
  title?: string;
  /** Content to render inside the bottom sheet */
};

const PriceModal = forwardRef<BottomSheetRef, props>((props, ref) => {
  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['30%']}
      handleComponent={HeaderHandle}
      footerComponent={CustomFooter}
    >
      <View className="flex-row items-center justify-center gap-x-10 px-4 pt-5">
        <View className="flex-1">
          <Text className="text-lg font-bold text-font dark:text-font-dark">От</Text>
          <BottomSheetTextInput
            className="rounded-md bg-background-input p-3 text-font dark:bg-background-input-dark dark:text-font-dark"
            keyboardType="numeric"
            autoFocus
          />
        </View>

        <View className="flex-1">
          <Text className="text-lg font-bold text-font dark:text-font-dark">До</Text>
          <BottomSheetTextInput
            className="rounded-md bg-background-input p-3 text-font dark:bg-background-input-dark dark:text-font-dark"
            keyboardType="numeric"
          />
        </View>
      </View>
    </CustomBottomSheetModal>
  );
});

PriceModal.displayName = 'PriceModal';

export default PriceModal;
