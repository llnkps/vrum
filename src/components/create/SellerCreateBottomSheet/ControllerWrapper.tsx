import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { SellerCreateBottomSheet, options } from './SellerCreateBottomSheet';

interface SellerControllerWrapperProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

const Wrapper = ({ value, onChange, error }: SellerControllerWrapperProps) => {
  console.log('Rendering SellerCreateBottomSheet Wrapper');
  const sellerModalRef = useRef<BottomSheetRef>(null);
  const handlePresentSellerModalPress = useCallback(() => {
    sellerModalRef.current?.present();
  }, []);

  // Find the label for the current value
  const selectedLabel = React.useMemo(() => {
    return options.find(opt => opt.value === value)?.label;
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        variant="bordered"
        label={'Продавец'}
        selectedValue={selectedLabel}
        onPress={handlePresentSellerModalPress}
        rightIcon="chevron-down"
        required
        error={error}
      />
      <SellerCreateBottomSheet
        ref={sellerModalRef}
        onChange={(seller) => {
          onChange(seller?.value || '');
          sellerModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export const SellerCreateBottomSheetControllerWrapper = React.memo(Wrapper);