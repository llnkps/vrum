import { CustomRectButton } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Text, View } from 'react-native';
import React from 'react';

export const CheckboxRectButton = React.memo(
  ({ value, label, onPress }: { value: boolean; label: string | React.ReactNode; onPress: () => void }) => {
    const onClick = () => {
      onPress();
    };

    return (
      <CustomRectButton onPress={onClick} appearance="subtle">
        <View className="flex-row items-center justify-between space-x-2">
          {typeof label === 'string' ? <Text className="font-bold text-font dark:text-font-dark">{label}</Text> : label}
          <View pointerEvents="none">
            <Checkbox value={value} />
          </View>
        </View>
      </CustomRectButton>
    );
  }
);

CheckboxRectButton.displayName = 'CheckboxRectButton';
