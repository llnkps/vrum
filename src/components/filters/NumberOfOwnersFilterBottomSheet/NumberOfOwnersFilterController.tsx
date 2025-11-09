import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { NumberOfOwnersFilterBottomSheet } from './NumberOfOwnersFilterBottomSheet';

interface NumberOfOwnersFilterControllerProps {
  value?: Array<{ label: string; value: string }>;
  onChange: (value: Array<{ label: string; value: string }> | undefined) => void;
  error?: string;
}

const NumberOfOwnersFilterController = ({ value, onChange, error }: NumberOfOwnersFilterControllerProps) => {
  const { t } = useTranslation();
  const numberOfOwnersModalRef = useRef<BottomSheetRef>(null);

  const handlePresentNumberOfOwnersModalPress = useCallback(() => {
    numberOfOwnersModalRef.current?.present();
  }, []);

  const selectedValue = React.useMemo(() => {
    if (!value || value.length === 0) return undefined;
    return value.map(t => t.label).join(', ');
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        label={t('filters.numberOfOwners.label')}
        selectedValue={selectedValue}
        onPress={handlePresentNumberOfOwnersModalPress}
        variant="bordered"
        showRightArrow
        rightIcon="chevron-down"
        selectedValueMode="replace"
        error={error}
      />
      <NumberOfOwnersFilterBottomSheet
        ref={numberOfOwnersModalRef}
        onChange={(options) => {
          onChange(options.length > 0 ? options : undefined);
          numberOfOwnersModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export { NumberOfOwnersFilterController };