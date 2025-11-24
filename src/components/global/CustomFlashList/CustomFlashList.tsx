import React from 'react';
import { FlashList, AnimatedFlashList, FlashListProps } from '@shopify/flash-list';
import { RefreshControl, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '@/theme';

interface CustomProps {
  /**
   * Whether to use AnimatedFlashList for animations. Defaults to false.
   */
  animated?: boolean;

  /**
   * Refresh control: Whether the list is refreshing.
   */
  refreshing?: boolean;

  /**
   * Refresh control: Callback when refresh is triggered.
   */
  onRefresh?: () => void;

  /**
   * Refresh control: Tint color for the refresh indicator.
   */
  refreshTintColor?: string;

  /**
   * Empty component: Custom icon component. Defaults to Ionicons 'document-text-outline'.
   */
  emptyIcon?: React.ComponentType<any>;

  /**
   * Empty component: Text to display when list is empty. Defaults to 'No items found'.
   */
  emptyText?: string;

  /**
   * Header component: Text for the header. If provided, renders a header with this text.
   */
  headerText?: string;

  /**
   * Footer component: Custom footer component to render at the bottom.
   */
  footerComponent?: React.ComponentType<any> | React.ReactElement;
}

type Props<T> = CustomProps & FlashListProps<T>;

const List = <T,>(props: Props<T>) => {
  const theme = useTheme() as CustomTheme;
  const {
    animated = false,
    refreshing = false,
    onRefresh,
    refreshTintColor = theme.colors.primary,
    emptyIcon: EmptyIcon = Ionicons,
    emptyText = 'No items found',
    headerText,
    footerComponent,
    ...flashListProps
  } = props;

  const ListComponent = animated ? AnimatedFlashList : FlashList;

  const refreshControl = onRefresh ? (
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={refreshTintColor} />
  ) : undefined;

  const listEmptyComponent = (
    <View className="flex-1 items-center justify-center py-10">
      <EmptyIcon name="document-text-outline" size={64} color={theme.colors.icon} />
      <Text className="mt-4 text-center" style={{ color: theme.colors.primary }}>
        {emptyText}
      </Text>
    </View>
  );

  const listHeaderComponent = headerText ? (
    <View className="px-4 pb-6 pt-5">
      <Text className="text-2xl font-bold" style={{ color: theme.colors.text }}>
        {headerText}
      </Text>
    </View>
  ) : undefined;

  const listFooterComponent = footerComponent;

  return (
    <ListComponent
      refreshControl={refreshControl}
      ListEmptyComponent={listEmptyComponent}
      ListHeaderComponent={listHeaderComponent}
      ListFooterComponent={listFooterComponent}
      {...flashListProps}
    />
  );
};

export default List;