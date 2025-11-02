import { UserSubscriptionFilter } from '@/openapi/client';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useRef } from 'react';
import { Animated, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler'; // Импорт для свайпов
import { CustomTheme } from '@/theme';

interface SubscriptionCardProps {
  item: UserSubscriptionFilter & {
    createdAt?: string;
    lastUsed?: string;
    isDefault?: boolean;
    isActive?: boolean; // Новое поле для активности подписки
    newAdsCount?: number; // Новое поле для количества новых объявлений
  };
  onPress?: () => void; // Посмотреть результаты
  onDelete?: () => void;
  onEdit?: () => void;
  onToggle?: (isActive: boolean) => void; // Toggle для подписки
}

const SubscriptionCard = ({ item, onPress, onDelete, onEdit, onToggle }: SubscriptionCardProps) => {
  const theme = useTheme() as CustomTheme;
  const swipeableRef = useRef<Swipeable>(null);

  // Цвета для иконок
  const editColor = theme.colors.icon;
  const deleteColor = theme.colors.textDanger;
  const notifyColor = item.isActive ? theme.colors.button.primary : theme.colors.textSubtle; // Цвет для индикатора подписки

  // Форматирование даты: "Обновлено X часов назад"
  const formatLastUpdated = (dateString?: string) => {
    if (!dateString) return '';
    const now = new Date();
    const lastUsed = new Date(dateString);
    const diffMs = now.getTime() - lastUsed.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return 'Обновлено недавно';
    if (diffHours < 24) return `Обновлено ${diffHours} ч назад`;
    const diffDays = Math.floor(diffHours / 24);
    return `Обновлено ${diffDays} д назад`;
  };

  // Сжатое описание параметров (берём ключевые, например, цена, пробег)
  const filterSummary = () => {
    const filters = item.filters || {};
    const parts = [];
    if (filters.price) parts.push(`Цена: ${filters.price.join(', ')}`);
    if (filters.mileage) parts.push(`Пробег < ${filters.mileage.join(', ')} км`);
    if (filters.year) parts.push(`Год: ${filters.year.join(', ')}`);
    return parts.slice(0, 2).join(' · ') || 'Нет параметров';
  };

  // Рендер правого свайпа (Удалить)
  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
    });
    return (
      <Animated.View style={{ transform: [{ translateX: trans }] }}>
        <RectButton
          style={{
            backgroundColor: deleteColor,
            justifyContent: 'center',
            alignItems: 'center',
            width: 80,
            height: '100%',
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
          }}
          onPress={() => {
            swipeableRef.current?.close();
            onDelete?.();
          }}
        />
        <Ionicons name="trash-outline" size={24} color="white" />
      </Animated.View>
    );
  };

  // Рендер левого свайпа (Открыть результаты)
  const renderLeftActions = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => {
    const trans = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [-100, 0],
    });
    return (
      <Animated.View style={{ transform: [{ translateX: trans }] }}>
        <RectButton
          style={{
            backgroundColor: theme.colors.button.primary,
            justifyContent: 'center',
            alignItems: 'center',
            width: 80,
            height: '100%',
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
          }}
          onPress={() => {
            swipeableRef.current?.close();
            onPress?.();
          }}
        >
          <Ionicons name="search" size={24} color="white" />
        </RectButton>
      </Animated.View>
    );
  };

  return (
    <View style={{ marginVertical: 8 }}>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
        friction={2}
        leftThreshold={40}
        rightThreshold={40}
      >
        <Pressable
          style={{
            borderRadius: 12,
            borderWidth: 1,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surface,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
          onPress={onPress}
          android_ripple={{ color: '#f3f4f6' }}
        >
          <View style={{ padding: 16 }}>
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

            {/* Центр: Инфо о новых объявлениях */}
            {item.newAdsCount && item.newAdsCount > 0 && (
              <Text
                style={{
                  fontSize: 14,
                  color: theme.colors.button.primary, // text-font-selected
                  fontWeight: '600',
                  marginBottom: 8,
                }}
              >
                +{item.newAdsCount} новых авто за 24 ч
              </Text>
            )}

            {/* Дата последнего обновления */}
            <Text style={{ fontSize: 12, color: theme.colors.textSubtle, marginBottom: 12 }}>{formatLastUpdated(item.lastUsed)}</Text>

            {/* Низ: Кнопки действий */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  backgroundColor: theme.colors.button.primary,
                  borderRadius: 8,
                }}
                onPress={onPress}
                activeOpacity={0.8}
              >
                <Ionicons name="search" size={16} color="white" style={{ marginRight: 6 }} />
                <Text style={{ color: 'white', fontWeight: '600' }}>Посмотреть результаты</Text>
              </TouchableOpacity>

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
