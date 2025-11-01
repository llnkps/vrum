import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { View, Text } from 'react-native';

// Import frame type images
import SedanIcon from '@/assets/images/frame-types/sedan.svg';
import Hatchback5dIcon from '@/assets/images/frame-types/hatchback_5d.svg';
import Hatchback3dIcon from '@/assets/images/frame-types/hatchback_3d.svg';
import LiftbackIcon from '@/assets/images/frame-types/liftback.svg';
import Suv5dIcon from '@/assets/images/frame-types/suv_5d.svg';
import Suv3dIcon from '@/assets/images/frame-types/suv_3d.svg';
import WagonIcon from '@/assets/images/frame-types/wagon.svg';
import MinivanIcon from '@/assets/images/frame-types/minivan.svg';
import PickupIcon from '@/assets/images/frame-types/pickup.svg';
import CoupeIcon from '@/assets/images/frame-types/coupe.svg';
import ConvertibleIcon from '@/assets/images/frame-types/convertible.svg';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

// Map frame type values to their corresponding icons
const frameTypeIcons = {
  sedan: SedanIcon,
  hatchback_5d: Hatchback5dIcon,
  hatchback_3d: Hatchback3dIcon,
  liftback: LiftbackIcon,
  suv_5d: Suv5dIcon,
  suv_3d: Suv3dIcon,
  wagon: WagonIcon,
  minivan: MinivanIcon,
  pickup: PickupIcon,
  coupe: CoupeIcon,
  convertible: ConvertibleIcon,
};

type BodyTypeOption = (typeof options)[number];

type BodyTypeCreateModalProps = {
  onChange: (value: BodyTypeOption | undefined) => void;
};

export const options = [
  { label: 'Седан', value: 'sedan' },
  { label: 'Хэтчбек 5дв', value: 'hatchback_5d' },
  { label: 'Хэтчбек 3дв', value: 'hatchback_3d' },
  { label: 'Лифтбек', value: 'liftback' },
  { label: 'Джип 5дв', value: 'suv_5d' },
  { label: 'Джип 3дв', value: 'suv_3d' },
  { label: 'Универсал', value: 'wagon' },
  { label: 'Минивэн', value: 'minivan' },
  { label: 'Пикап', value: 'pickup' },
  { label: 'Купе', value: 'coupe' },
  { label: 'Открытый', value: 'convertible' },
];

export const BodyTypeCreateBottomSheet = forwardRef<BottomSheetRef, BodyTypeCreateModalProps>(({ onChange }, ref) => {
  const [selectedBodyType, setSelectedBodyType] = React.useState<BodyTypeOption | undefined>(undefined);
  const theme = useTheme();

  const handleToggle = (option: BodyTypeOption) => {
    setSelectedBodyType(option);
  };
  const handleConfirm = () => {
    onChange(selectedBodyType);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['40%']}
      enableContentPanningGesture={true}
      title={'Тип кузова'}
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetScrollView enableFooterMarginAdjustment>
        {options.map(opt => {
          const IconComponent = frameTypeIcons[opt.value as keyof typeof frameTypeIcons];
          return (
            <CustomRectButton key={opt.value} onPress={() => handleToggle(opt)}>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <IconComponent width={32} height={32} color="red" />
                  <Text className="text-base text-font dark:text-font-dark">{opt.label}</Text>
                </View>
                {selectedBodyType?.value === opt.value && <Feather name="check" size={18} color={theme.colors.icon} />}
              </View>
            </CustomRectButton>
          );
        })}
      </BottomSheetScrollView>
    </CustomBottomSheetModal>
  );
});
BodyTypeCreateBottomSheet.displayName = 'BodyTypeCreateBottomSheet';
