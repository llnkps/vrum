import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { Text, View } from 'react-native';

type ColorOption = (typeof options)[number];

type ColorFilterBottomSheetProps = {
  onChange: (values: ColorOption[]) => void;
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

export const ColorFilterBottomSheet = forwardRef<BottomSheetRef, ColorFilterBottomSheetProps>(({ onChange }, ref) => {
  const [selectedColors, setSelectedColors] = React.useState<ColorOption[]>([]);

  const handleToggle = (option: ColorOption) => {
    const isSelected = selectedColors.some(c => c.value === option.value);
    if (isSelected) {
      setSelectedColors(selectedColors.filter(c => c.value !== option.value));
    } else {
      setSelectedColors([...selectedColors, option]);
    }
  };

  const handleConfirm = () => {
    onChange(selectedColors);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['60%']}
      enableContentPanningGesture={true}
      title="Цвет"
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView className="flex-col">
        {options.map(option => (
          <CheckboxRectButton
            key={option.value}
            value={selectedColors.some(c => c.value === option.value)}
            onPress={() => handleToggle(option)}
            label={
              <View className="flex-row items-center">
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 4,
                    backgroundColor: option.color,
                    marginRight: 16,
                    borderWidth: option.value === 'white' ? 1 : 0,
                    borderColor: '#E5E5E5',
                  }}
                />
                <Text className="text-font dark:text-font-dark">{option.label}</Text>
              </View>
            }
          />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
ColorFilterBottomSheet.displayName = 'ColorFilterBottomSheet';
