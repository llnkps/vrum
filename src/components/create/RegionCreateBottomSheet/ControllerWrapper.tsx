import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { Region } from '@/openapi/client';
import React, { useCallback, useRef } from 'react';
import { Controller, Control } from 'react-hook-form';
import { RegionCreateBottomSheet } from './RegionCreateBottomSheet';

interface RegionControllerWrapperProps {
  control: Control<any>;
}

const Wrapper = ({ control }: RegionControllerWrapperProps) => {
  const [selectedRegion, setSelectedRegion] = React.useState<string | undefined>(undefined);
  console.log('Rendering RegionCreateBottomSheet Wrapper');
  const regionModalRef = useRef<BottomSheetRef>(null);
  const handlePresentRegionModalPress = useCallback(() => {
    regionModalRef.current?.present();
  }, []);

  return (
    <>
      <Controller
        control={control}
        name="region"
        rules={{
          required: 'Выберите регион'
        }}
        render={({ field: _field, fieldState: { error } }) => (
          <>
            <TouchableHighlightRow
              variant="bordered"
              label={'Регион'}
              selectedValue={selectedRegion ?? undefined}
              onPress={handlePresentRegionModalPress}
              rightIcon="chevron-down"
              required
              error={error?.message}
            />
            <RegionCreateBottomSheet
              ref={regionModalRef}
              onChange={(region: Region) => {
                _field.onChange(region.slug);
                setSelectedRegion(region.name || '');
                regionModalRef.current?.close({ duration: 150 });
              }}
            />
          </>
        )}
      />
    </>
  );
};

export const RegionCreateBottomSheetControllerWrapper = React.memo(Wrapper);