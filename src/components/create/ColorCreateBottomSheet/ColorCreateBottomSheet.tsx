import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { CustomTheme } from '@/theme';
import { Feather } from '@expo/vector-icons';
import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import React, { forwardRef } from 'react';
import { Text, View } from 'react-native';

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

export const ColorCreateBottomSheet = forwardRef<BottomSheetRef, ColorCreateBottomSheetProps>(({ onChange }, ref) => {
  const theme = useTheme() as CustomTheme;
  const [selectedColor, setSelectedColor] = React.useState<ColorOption | undefined>(undefined);

  const handleToggle = (option: ColorOption) => {
    setSelectedColor(option);
  };
  const handleConfirm = () => {
    onChange(selectedColor);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['40%']}
      enableContentPanningGesture={true}
      title={'Цвет'}
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetScrollView enableFooterMarginAdjustment>
        {options.map(opt => (
          <CustomRectButton key={opt.value} title={opt.label} isSelected={selectedColor?.value === opt.value} onPress={() => handleToggle(opt)}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <View style={{ backgroundColor: opt.color, width: 24, height: 24, borderRadius: 12 }} />
                <Text style={{ color: theme.colors.text, fontSize: 16 }}>{opt.label}</Text>
              </View>
              {selectedColor?.value === opt.value && <Feather name="check" size={18} color={theme.colors.icon} />}
            </View>
          </CustomRectButton>
        ))}
      </BottomSheetScrollView>
    </CustomBottomSheetModal>
  );
});
ColorCreateBottomSheet.displayName = 'ColorCreateBottomSheet';
