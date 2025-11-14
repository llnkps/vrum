import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { ColorCreateBottomSheet, options } from './ColorCreateBottomSheet';

interface ColorControllerWrapperProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

const Wrapper = ({ value, onChange, error }: ColorControllerWrapperProps) => {
  console.log('Rendering ColorCreateBottomSheet Wrapper');
  const colorModalRef = useRef<BottomSheetRef>(null);
  const handlePresentColorModalPress = useCallback(() => {
    colorModalRef.current?.present();
  }, []);

  // Find the label for the current value
  const selectedLabel = React.useMemo(() => {
    return options.find(opt => opt.value === value)?.label;
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        variant="bordered"
        label={'Цвет'}
        selectedValue={selectedLabel}
        onPress={handlePresentColorModalPress}
        rightIcon="chevron-down"
        required
        error={error}
      />
      <ColorCreateBottomSheet
        ref={colorModalRef}
        onChange={color => {
          onChange(color?.value || '');
          colorModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export const ColorCreateBottomSheetControllerWrapper = React.memo(Wrapper);
