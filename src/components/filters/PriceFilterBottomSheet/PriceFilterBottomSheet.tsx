import CustomBottomSheetModal from '@/components/global/CustomBottomSheetModal';
import { BottomSheetField } from '@/components/ui/input/BottomSheetField';
import { RangeFilterType } from '@/types/filter';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { CustomTheme } from '@/theme';

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

export type BottomSheetRef = BottomSheetModal;

type props = {
  onChange?: (price: RangeFilterType) => void;
};

export const PriceBottomSheet = forwardRef<BottomSheetRef, props>((props, ref) => {
  const { t } = useTranslation();
  const theme = useTheme() as CustomTheme;
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const themedStyles = StyleSheet.create({
    label: {
      fontSize: theme.text.lg,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
  });

  const handleConfirm = () => {
    const min = minPrice ? parseInt(minPrice) : undefined;
    const max = maxPrice ? parseInt(maxPrice) : undefined;
    props.onChange?.({ from: min, to: max });
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['30%']}
      footerProps={{
        onConfirm: handleConfirm,
      }}
      title={t('filters.price.label')}
    >
      <BottomSheetView>
        <View style={styles.container}>
          <View style={styles.fieldContainer}>
            <Text style={themedStyles.label}>{t('filters.price.fromLabel')}</Text>
            <BottomSheetField keyboardType="numeric" value={minPrice} onChangeText={setMinPrice} autoFocus placeholder="100000" />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={themedStyles.label}>{t('filters.price.toLabel')}</Text>
            <BottomSheetField keyboardType="numeric" value={maxPrice} onChangeText={setMaxPrice} placeholder="500000" />
          </View>
        </View>
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});

PriceBottomSheet.displayName = 'PriceBottomSheet';
