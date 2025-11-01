import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { YearCreateBottomSheet } from './YearCreateBottomSheet';

interface YearControllerWrapperProps {
  value?: number;
  onChange: (value: number) => void;
  error?: string;
}

const Wrapper = ({ value, onChange, error }: YearControllerWrapperProps) => {
  console.log('Rendering YearCreateBottomSheet Wrapper');
  const yearModalRef = useRef<BottomSheetRef>(null);
  const handlePresentYearModalPress = useCallback(() => {
    yearModalRef.current?.present();
  }, []);

  // Format the year value for display
  const selectedLabel = value?.toString();

  return (
    <>
      <TouchableHighlightRow
        variant="bordered"
        label={'Год'}
        selectedValue={selectedLabel}
        onPress={handlePresentYearModalPress}
        rightIcon="chevron-down"
        required
        error={error}
      />
      <YearCreateBottomSheet
        ref={yearModalRef}
        onChange={(releaseYear: number | undefined) => {
          if (releaseYear !== undefined) {
            onChange(releaseYear);
          }
          yearModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export const YearCreateBottomSheetControllerWrapper = React.memo(Wrapper);