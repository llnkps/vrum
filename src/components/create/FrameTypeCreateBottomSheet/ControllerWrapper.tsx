import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { BodyTypeCreateBottomSheet, options } from './FrameTypeCreateBottomSheet';

interface BodyTypeControllerWrapperProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

const Wrapper = ({ value, onChange, error }: BodyTypeControllerWrapperProps) => {
  const bodyTypeModalRef = useRef<BottomSheetRef>(null);
  const handlePresentBodyTypeModalPress = useCallback(() => {
    bodyTypeModalRef.current?.present();
  }, []);

  // Find the label for the current value
  const selectedLabel = React.useMemo(() => {
    return options.find(opt => opt.value === value)?.label;
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        variant="bordered"
        label={'Тип кузова'}
        selectedValue={selectedLabel}
        onPress={handlePresentBodyTypeModalPress}
        rightIcon="chevron-down"
        required
        error={error}
      />
      <BodyTypeCreateBottomSheet
        ref={bodyTypeModalRef}
        onChange={bodyType => {
          onChange(bodyType?.value || '');
          bodyTypeModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export const BodyTypeCreateBottomSheetControllerWrapper = React.memo(Wrapper);
