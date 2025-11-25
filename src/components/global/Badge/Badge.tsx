import React from 'react';
import { Text, View } from 'react-native';

type BadgeProps = {
  text: string;
  variant?: 'default' | 'warning' | 'success';
  onPress?: () => void;
};

export const Badge: React.FC<BadgeProps> = ({ text, variant = 'default', onPress }) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'warning':
        return '#fbbf24'; // amber-400
      case 'success':
        return '#10b981'; // emerald-500
      default:
        return '#6b7280'; // gray-500
    }
  };

  return (
    <View
      onTouchEnd={onPress}
      style={{
        backgroundColor: getBackgroundColor(),
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginTop: 4,
      }}
    >
      <Text style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>{text}</Text>
    </View>
  );
};
