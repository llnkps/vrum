import CustomBottomSheetModal from '@/components/global/CustomBottomSheetModal';
import CustomWheelPicker from '@/components/global/CustomWheelPicker';
import { RangeFilterType } from '@/types/filter';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { PickerItem, ValueChangedEvent } from '@quidone/react-native-wheel-picker';
import React, { forwardRef, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

export type BottomSheetRef = BottomSheetModal;

type YearModalProps = {
  onChange?: (year: RangeFilterType) => void;
};

// Move years array outside component to avoid recreation on every render
const years = [
  { value: undefined as number | undefined, label: '--' },
  ...[...Array(50).keys()].map(index => ({
    value: 2025 - index,
    label: (2025 - index).toString(),
  })),
];

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40, // gap-x-10
    paddingHorizontal: 16, // px-4
    paddingTop: 20, // pt-5
  },
  fieldContainer: {
    flex: 1,
  },
});

export const YearBottomSheet = memo(
  forwardRef<BottomSheetRef, YearModalProps>((props, ref) => {
    const { t } = useTranslation();
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
        title={t('filters.year.label')}
      >
        <BottomSheetView>
          <View style={styles.container}>
            <View style={styles.fieldContainer}>
              <CustomWheelPicker
                virtualized={true}
                data={years}
                value={minYear}
                onValueChanged={handleMinYearChange}
                label={t('filters.year.fromLabel')}
              />
            </View>

            <View style={styles.fieldContainer}>
              <CustomWheelPicker
                virtualized={true}
                data={years}
                value={maxYear}
                onValueChanged={handleMaxYearChange}
                label={t('filters.year.toLabel')}
              />
            </View>
          </View>
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  })
);
YearBottomSheet.displayName = 'YearBottomSheet';
