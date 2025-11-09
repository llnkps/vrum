import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TransmissionFilterBottomSheet } from './TransmissionFilterBottomSheet';

interface TransmissionFilterControllerProps {
  value?: Array<{ label: string; value: string }>;
  onChange: (value: Array<{ label: string; value: string }> | undefined) => void;
  error?: string;
}

const TransmissionFilterController = ({ value, onChange, error }: TransmissionFilterControllerProps) => {
  const { t } = useTranslation();
  const transmissionModalRef = useRef<BottomSheetRef>(null);

  const handlePresentTransmissionModalPress = useCallback(() => {
    transmissionModalRef.current?.present();
  }, []);

  const selectedValue = React.useMemo(() => {
    if (!value || value.length === 0) return undefined;
    return value.map(t => t.label).join(', ');
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        label={t('filters.transmission.label')}
        selectedValue={selectedValue}
        onPress={handlePresentTransmissionModalPress}
        variant="bordered"
        showRightArrow
        rightIcon="chevron-down"
        selectedValueMode="replace"
        error={error}
      />
      <TransmissionFilterBottomSheet
        ref={transmissionModalRef}
        onChange={(options) => {
          onChange(options.length > 0 ? options : undefined);
          transmissionModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export { TransmissionFilterController };