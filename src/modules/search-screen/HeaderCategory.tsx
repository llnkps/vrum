import { Text, TouchableHighlight, View } from 'react-native';

import HeaderAuto from '@/assets/images/header-auto-icon.svg';
import HeaderBreak from '@/assets/images/header-break-icon.svg';
import HeaderMoto from '@/assets/images/header-moto-icon.svg';
import HeaderSpecAuto from '@/assets/images/header-specauto-icon.svg';

import { CustomTheme } from '@/theme';
import { useTheme } from '@react-navigation/native';
import { ActiveScreen } from './types';

const CategoryButton = ({ isActive, onPress, Icon, label }: { isActive: boolean; onPress: () => void; Icon: React.ComponentType; label: string }) => {
  const theme = useTheme() as CustomTheme;
  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={0.6}
      underlayColor={theme.colors.backgroundNeutral}
      className="rounded-2xl px-2 py-3"
      style={{ backgroundColor: isActive ? theme.colors.backgroundNeutral : undefined, width: 85 }}
    >
      <View className="flex-col items-center justify-center">
        <Icon />
        <Text className="mt-2" style={{ color: theme.colors.text, fontSize: 10 }}>
          {label}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export const HeaderCategory = ({
  activeScreen,
  setActiveScreen,
}: {
  activeScreen: ActiveScreen;
  setActiveScreen: React.Dispatch<React.SetStateAction<ActiveScreen>>;
}) => {
  const handleChangeScreen = (screen: ActiveScreen) => {
    setActiveScreen(screen);
  };

  const categories = [
    { key: 'auto' as ActiveScreen, Icon: HeaderAuto, label: 'Автомобили' },
    { key: 'spec_auto' as ActiveScreen, Icon: HeaderSpecAuto, label: 'Спецтехника' },
    { key: 'auto_detail' as ActiveScreen, Icon: HeaderBreak, label: 'Запчасти' },
    { key: 'moto' as ActiveScreen, Icon: HeaderMoto, label: 'Мототехника' },
  ];

  return (
    <View className="flex-row items-center justify-center gap-2">
      {categories.map(({ key, Icon, label }) => (
        <CategoryButton key={key} isActive={activeScreen === key} onPress={() => handleChangeScreen(key)} Icon={Icon} label={label} />
      ))}
    </View>
  );
};
