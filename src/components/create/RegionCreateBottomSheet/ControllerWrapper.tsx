import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { Region } from '@/openapi/client';
import React, { useCallback, useRef } from 'react';
import { RegionCreateBottomSheet } from './RegionCreateBottomSheet';

interface RegionControllerWrapperProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const Wrapper = ({ value, onChange, error }: RegionControllerWrapperProps) => {
  console.log('Rendering RegionCreateBottomSheet Wrapper');
  const [selectedLabel, setSelectedLabel] = React.useState<string | undefined>(undefined);
  const regionModalRef = useRef<BottomSheetRef>(null);
  const handlePresentRegionModalPress = useCallback(() => {
    regionModalRef.current?.present();
  }, []);

  return (
    <>
      <TouchableHighlightRow
        variant="bordered"
        label={'Регион'}
        selectedValue={selectedLabel}
        onPress={handlePresentRegionModalPress}
        rightIcon="chevron-down"
        required
        error={error}
      />
      <RegionCreateBottomSheet
        ref={regionModalRef}
        value={value}
        setSelectedLabel={setSelectedLabel}
        onChange={(region: Region) => {
          onChange(region.slug);
          setSelectedLabel(region.name);
          regionModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export const RegionCreateBottomSheetControllerWrapper = React.memo(Wrapper);