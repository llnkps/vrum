import CustomBottomSheetModal from '@/components/global/CustomBottomSheetModal';
import { BottomSheetField } from '@/components/ui/input/BottomSheetField';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-gesture-handler';

export type BottomSheetRef = BottomSheetModal;

type props = {
  onChange?: (price: { min?: number; max?: number }) => void;
};

export const PriceBottomSheet = forwardRef<BottomSheetRef, props>((props, ref) => {
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const handleConfirm = () => {
    const min = minPrice ? parseInt(minPrice) : undefined;
    const max = maxPrice ? parseInt(maxPrice) : undefined;
    props.onChange?.({ min, max });
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
        <View className="flex-row items-center justify-center gap-x-10 px-4 pt-5">
          <View className="flex-1">
            <Text className="text-lg font-bold text-font dark:text-font-dark">От</Text>
            <BottomSheetField
              keyboardType="numeric"
              value={minPrice}
              onChangeText={setMinPrice}
              autoFocus
              placeholder="100000"
            />
          </View>

          <View className="flex-1">
            <Text className="text-lg font-bold text-font dark:text-font-dark">До</Text>
            <BottomSheetField
              keyboardType="numeric"
              value={maxPrice}
              onChangeText={setMaxPrice}
              placeholder="500000"
            />
          </View>
        </View>
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});

PriceBottomSheet.displayName = 'PriceBottomSheet';
