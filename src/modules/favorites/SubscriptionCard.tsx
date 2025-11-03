import { UserSubscriptionFilter } from '@/openapi/client';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useRef } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { CustomTheme } from '@/theme';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { CustomRectButton } from '@/components/ui/button';

interface SubscriptionCardProps {
  item: UserSubscriptionFilter & {
    createdAt?: string;
    lastUsed?: string;
    isDefault?: boolean;
    isActive?: boolean;
    newAdsCount?: number;
  };
  onPress?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onToggle?: (isActive: boolean) => void;
}

const SubscriptionCard = ({ item, onPress, onDelete, onEdit, onToggle }: SubscriptionCardProps) => {
  const theme = useTheme() as CustomTheme;
  const swipeableRef = useRef<any>(null);

  const notifyColor = item.isActive ? theme.colors.button.primary : theme.colors.textSubtle;

  const filterSummary = () => {
    const filters = item.filters || {};
    const parts = [];
    if (filters.price) parts.push(`Цена: ${filters.price.join(', ')}`);
    if (filters.mileage) parts.push(`Пробег < ${filters.mileage.join(', ')} км`);
    if (filters.year) parts.push(`Год: ${filters.year.join(', ')}`);
    return parts.slice(0, 2).join(' · ') || 'Нет параметров';
  };

  const renderLeftActions = (progress: any, dragX: any) => {
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: dragX.value - 80 }], // Анимация сдвига
    }));

    return (
      <Animated.View
        style={[
          animatedStyle,
          { width: 80, height: '100%', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 12, borderBottomLeftRadius: 12 },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            onEdit?.();
            swipeableRef.current?.close(); // Закрыть свайп
          }}
          style={{ alignItems: 'center' }}
        >
          <Ionicons name="pencil" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderRightActions = (progress: any, dragX: any) => {
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: dragX.value + 80 }], // Анимация сдвига
    }));

    return (
      <Animated.View
        style={[
          animatedStyle,
          { width: 80, height: '100%', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 12, borderBottomRightRadius: 12 },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            onDelete?.();
            swipeableRef.current?.close(); // Закрыть свайп
          }}
          style={{ alignItems: 'center' }}
        >
          <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={{ marginBottom: 12 }}>
      <Swipeable
        ref={swipeableRef}
        friction={2}
        leftThreshold={40}
        rightThreshold={40}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
      >
        <Pressable
          style={{
            borderRadius: 12,
            borderWidth: 1,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.backgroundNeutral,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
          onPress={onPress}
          android_ripple={{ color: '#f3f4f6' }}
        >
          <View style={{ padding: 14 }}>
            {/* Верх: Название и подзаголовок */}
            <View style={{ marginBottom: 8 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: theme.colors.text,
                  marginBottom: 4,
                }}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text style={{ fontSize: 14, color: theme.colors.textSubtle }}>{filterSummary()}</Text>
            </View>

            {/* Низ: Кнопки действий */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <CustomRectButton appearance="primary" onPress={onPress} size="small" style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="search" size={16} color="white" style={{ marginRight: 6 }} />
                <Text style={{ color: 'white', fontWeight: '600' }}>Показать</Text>
              </CustomRectButton>

              {/* Toggle подписки */}
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}
                onPress={() => onToggle?.(!item.isActive)}
                activeOpacity={0.7}
              >
                <Ionicons name="notifications" size={20} color={notifyColor} />
                <Text style={{ marginLeft: 4, fontSize: 12, color: theme.colors.textSubtle }}>{item.isActive ? 'Активна' : 'Выключена'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Swipeable>
    </View>
  );
};

export default SubscriptionCard;
