import CustomBottomSheetModal from '@/components/global/CustomBottomSheetModal';
import CustomWheelPicker from '@/components/global/CustomWheelPicker';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { PickerItem, ValueChangedEvent } from '@quidone/react-native-wheel-picker';
import React, { forwardRef, useState } from 'react';
import { View } from 'react-native';

export type BottomSheetRef = BottomSheetModal;

type YearCreateModalProps = {
  onChange?: (year: number | undefined) => void;
};

const years = [
  { value: undefined as number | undefined, label: '--' },
  ...[...Array(100).keys()].map(index => ({
    value: 2025 - index,
    label: (2025 - index).toString(),
  })),
];

export const YearCreateBottomSheet = forwardRef<BottomSheetRef, YearCreateModalProps>((props, ref) => {
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);

  const handleYearChange = (value: ValueChangedEvent<PickerItem<number>>) => {
    setSelectedYear(value.item.value);
  };

  const handleConfirm = () => {
    props.onChange?.(selectedYear);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['50%']}
      footerProps={{
        onConfirm: handleConfirm,
      }}
      title="Год выпуска"
    >
      <BottomSheetView>
        <View className="flex-row items-center justify-center px-4 pt-5">
          <View className="flex-1">
            <CustomWheelPicker data={years} value={selectedYear} onValueChanged={handleYearChange} label="Год" />
          </View>
        </View>
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});

YearCreateBottomSheet.displayName = 'YearCreateBottomSheet';