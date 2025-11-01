import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { Controller, Control } from 'react-hook-form';
import { YearCreateBottomSheet } from './YearCreateBottomSheet';

interface YearControllerWrapperProps {
  control: Control<any>;
}

const Wrapper = ({ control }: YearControllerWrapperProps) => {
  const [selectedReleaseYear, setSelectedReleaseYear] = React.useState<string | undefined>(undefined);
  console.log('Rendering YearCreateBottomSheet Wrapper');
  const yearModalRef = useRef<BottomSheetRef>(null);
  const handlePresentYearModalPress = useCallback(() => {
    yearModalRef.current?.present();
  }, []);

  return (
    <>
      <Controller
        control={control}
        name="releaseYear"
        rules={{
          required: 'Выберите год выпуска'
        }}
        render={({ field: _field, fieldState: { error } }) => (
          <>
            <TouchableHighlightRow
              variant="bordered"
              label={'Год'}
              selectedValue={selectedReleaseYear ?? undefined}
              onPress={handlePresentYearModalPress}
              rightIcon="chevron-down"
              required
              error={error?.message}
            />
            <YearCreateBottomSheet
              ref={yearModalRef}
              onChange={(releaseYear: number | undefined) => {
                _field.onChange(releaseYear);
                setSelectedReleaseYear(releaseYear?.toString() || '');
                yearModalRef.current?.close({ duration: 150 });
              }}
            />
          </>
        )}
      />
    </>
  );
};

export const YearCreateBottomSheetControllerWrapper = React.memo(Wrapper);