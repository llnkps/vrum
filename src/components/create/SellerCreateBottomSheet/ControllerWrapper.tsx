import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { Controller, Control } from 'react-hook-form';
import { SellerCreateBottomSheet } from './SellerCreateBottomSheet';

interface SellerControllerWrapperProps {
  control: Control<any>;
}

const Wrapper = ({ control }: SellerControllerWrapperProps) => {
  const [selectedSeller, setSelectedSeller] = React.useState<string | undefined>(undefined);
  console.log('Rendering SellerCreateBottomSheet Wrapper');
  const sellerModalRef = useRef<BottomSheetRef>(null);
  const handlePresentSellerModalPress = useCallback(() => {
    sellerModalRef.current?.present();
  }, []);

  return (
    <>
      <Controller
        control={control}
        name="seller"
        rules={{
          required: 'Выберите продавца'
        }}
        render={({ field: _field, fieldState: { error } }) => (
          <>
            <TouchableHighlightRow
              variant="bordered"
              label={'Продавец'}
              selectedValue={selectedSeller ?? undefined}
              onPress={handlePresentSellerModalPress}
              rightIcon="chevron-down"
              required
              error={error?.message}
            />
            <SellerCreateBottomSheet
              ref={sellerModalRef}
              onChange={(seller) => {
                _field.onChange(seller?.value || '');
                setSelectedSeller(seller?.label || '');
                sellerModalRef.current?.close({ duration: 150 });
              }}
            />
          </>
        )}
      />
    </>
  );
};

export const SellerCreateBottomSheetControllerWrapper = React.memo(Wrapper);