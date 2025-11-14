import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { FilterOptionType } from '@/types/filter';
import { Text, View } from 'react-native';

type ColorFilterBottomSheetProps = {
  onChange: (values: FilterOptionType[]) => void;
  options: readonly FilterOptionType[];
  title: string;
  selectedOptions?: FilterOptionType[];
};

export const ColorFilterBottomSheet = forwardRef<BottomSheetRef, ColorFilterBottomSheetProps>(
  ({ onChange, options, title, selectedOptions = [] }, ref) => {
    const [selectedColors, setSelectedColors] = React.useState<FilterOptionType[]>(selectedOptions);

    React.useEffect(() => {
      setSelectedColors(selectedOptions);
    }, [selectedOptions]);

    const handleToggle = (option: FilterOptionType) => {
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

    const getColorForValue = (value: string) => {
      const colorMap: Record<string, string> = {
        black: '#000000',
        white: '#FFFFFF',
        gray: '#808080',
        red: '#FF0000',
        blue: '#0000FF',
        green: '#008000',
        yellow: '#FFFF00',
        silver: '#C0C0C0',
        brown: '#A52A2A',
        beige: '#F5F5DC',
        orange: '#FFA500',
        purple: '#800080',
        other: '#CCCCCC',
      };
      return colorMap[value] || '#CCCCCC';
    };

    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={['60%']}
        enableContentPanningGesture={true}
        title={title}
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
                      backgroundColor: getColorForValue(option.value),
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
  }
);
ColorFilterBottomSheet.displayName = 'ColorFilterBottomSheet';
