import CustomBottomSheetModal from '@/components/global/CustomBottomSheetModal';
import { BottomSheetField } from '@/components/ui/input/BottomSheetField';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useState } from 'react';
import { View } from 'react-native';

export type BottomSheetRef = BottomSheetModal;

type PriceCreateModalProps = {
  onChange?: (price: number | undefined) => void;
};

export const PriceCreateBottomSheet = forwardRef<BottomSheetRef, PriceCreateModalProps>((props, ref) => {
  const [price, setPrice] = useState<string>('');

  const handleConfirm = () => {
    const parsedPrice = price ? parseInt(price) : undefined;
    props.onChange?.(parsedPrice);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['30%']}
      footerProps={{
        onConfirm: handleConfirm,
      }}
      title="Цена"
    >
      <BottomSheetView>
        <View className="flex-row items-center justify-center px-4 pt-5">
          <View className="flex-1">
            <BottomSheetField
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
              autoFocus
              placeholder="100000"
            />
          </View>
        </View>
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});

PriceCreateBottomSheet.displayName = 'PriceCreateBottomSheet';