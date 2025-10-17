import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type ColorOption = (typeof options)[number];

type ColorCreateBottomSheetProps = {
  onChange: (value: ColorOption | undefined) => void;
};

const options = [
  { label: 'Черный', value: 'black', color: '#000000' },
  { label: 'Белый', value: 'white', color: '#FFFFFF' },
  { label: 'Серый', value: 'gray', color: '#808080' },
  { label: 'Красный', value: 'red', color: '#FF0000' },
  { label: 'Синий', value: 'blue', color: '#0000FF' },
  { label: 'Зеленый', value: 'green', color: '#008000' },
  { label: 'Желтый', value: 'yellow', color: '#FFFF00' },
  { label: 'Другой', value: 'other', color: '#CCCCCC' },
];

export const ColorCreateBottomSheet = forwardRef<BottomSheetRef, ColorCreateBottomSheetProps>(
  ({ onChange }, ref) => {
    const [selectedColor, setSelectedColor] = React.useState<ColorOption | undefined>(undefined);

  const handleToggle = (option: ColorOption) => {
    setSelectedColor(option);
  };    const handleConfirm = () => {
      onChange(selectedColor);
    };

    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={['35%']}
        enableContentPanningGesture={true}
        title={'Цвет'}
        footerProps={{
          onConfirm: handleConfirm,
        }}
      >
              <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CustomRectButton
            key={opt.value}
            title={opt.label}
            isSelected={selectedColor?.value === opt.value}
            onPress={() => handleToggle(opt)}
          />
        ))}
      </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);
ColorCreateBottomSheet.displayName = 'ColorCreateBottomSheet';