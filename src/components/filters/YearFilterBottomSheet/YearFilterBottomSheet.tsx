import CustomBottomSheetModal from '@/components/global/CustomBottomSheetModal';
import CustomWheelPicker from '@/components/global/CustomWheelPicker';
import { RangeFilterType } from '@/types/filter';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { PickerItem, ValueChangedEvent } from '@quidone/react-native-wheel-picker';
import React, { forwardRef, useState } from 'react';
import { View } from 'react-native';

export type BottomSheetRef = BottomSheetModal;

type YearModalProps = {
  onChange?: (year: RangeFilterType) => void;
};

const years = [
  { value: undefined as number | undefined, label: '--' },
  ...[...Array(50).keys()].map(index => ({
    value: 2025 - index,
    label: (2025 - index).toString(),
  })),
];

export const YearBottomSheet = forwardRef<BottomSheetRef, YearModalProps>((props, ref) => {
  const [minYear, setMinYear] = useState<number | undefined>(undefined);
  const [maxYear, setMaxYear] = useState<number | undefined>(undefined);

  const handleMinYearChange = (value: ValueChangedEvent<PickerItem<number>>) => {
    setMinYear(value.item.value);
  };

  const handleMaxYearChange = (value: ValueChangedEvent<PickerItem<number>>) => {
    setMaxYear(value.item.value);
  };

  const handleConfirm = () => {
    props.onChange?.({ from: minYear, to: maxYear });
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
        <View className="flex-row items-center justify-center gap-x-10 px-4 pt-5">
          <View className="flex-1">
            <CustomWheelPicker data={years} value={minYear} onValueChanged={handleMinYearChange} label="От" />
          </View>

          <View className="flex-1">
            <CustomWheelPicker data={years} value={maxYear} onValueChanged={handleMaxYearChange} label="До" />
          </View>
        </View>
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});

YearBottomSheet.displayName = 'YearBottomSheet';
