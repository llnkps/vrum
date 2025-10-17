import clsx from 'clsx';
import { Text, TouchableHighlight, View } from 'react-native';

import HeaderAuto from '@/assets/images/header-auto-icon.svg';
import HeaderBreak from '@/assets/images/header-break-icon.svg';
import HeaderMoto from '@/assets/images/header-moto-icon.svg';
import HeaderSpecAuto from '@/assets/images/header-specauto-icon.svg';

import { ActiveScreen } from './types';

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

  // TODO: update buttons styles

  return (
    <View className="flex-row items-center justify-center gap-2 px-4 py-3">
      {/* Left side: Location */}
      <TouchableHighlight
        className={clsx('rounded-md bg-background-neutral p-2 dark:bg-background-neutral-dark', {
          'bg-background-neutral-pressed dark:bg-background-neutral-dark-pressed':
            activeScreen === 'auto',
        })}
        onPress={() => handleChangeScreen('auto')}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
      >
        <View className="flex-col items-center justify-center">
          <HeaderAuto />
          <Text className="text-font dark:text-font-dark">Автомобили</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        className={clsx('rounded-md bg-background-neutral p-2 dark:bg-background-neutral-dark', {
          'bg-background-neutral-pressed dark:bg-background-neutral-dark-pressed':
            activeScreen === 'spec_auto',
        })}
        onPress={() => handleChangeScreen('spec_auto')}
      >
        <View className="flex-col items-center justify-center">
          <HeaderSpecAuto />
          <Text className="text-font dark:text-font-dark">Спецтехника</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        className={clsx('rounded-md bg-background-neutral p-2 dark:bg-background-neutral-dark', {
          'bg-background-neutral-pressed dark:bg-background-neutral-dark-pressed':
            activeScreen === 'auto_detail',
        })}
        onPress={() => handleChangeScreen('auto_detail')}
      >
        <View className="flex-col items-center justify-center">
          <HeaderBreak />
          <Text className="text-font dark:text-font-dark">Запчасти</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        className={clsx('rounded-md bg-background-neutral p-2 dark:bg-background-neutral-dark', {
          'bg-background-neutral-pressed dark:bg-background-neutral-dark-pressed':
            activeScreen === 'moto',
        })}
        onPress={() => handleChangeScreen('moto')}
      >
        <View className="flex-col items-center justify-center">
          <HeaderMoto />
          <Text className="text-font dark:text-font-dark">Мототехника</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};
