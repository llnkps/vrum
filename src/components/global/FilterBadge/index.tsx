import clsx from 'clsx';
import React from 'react';
import { Text, View } from 'react-native';
import CloseIcon from '../CloseIcon';

export type FilterBadgeProps = {
  label: string;
  onRemove: () => void;
  className?: string;
  textClassName?: string;
};

/**
 * FilterBadge
 * - Rounded pill-like badge with label and removable close icon
 * - Respects light/dark theme using Tailwind classes from the project's theme scale
 * - Use inside horizontal lists to show selected brands/models/generations
 */
const FilterBadge: React.FC<FilterBadgeProps> = ({ label, onRemove, className, textClassName }) => {
  return (
    <View className={clsx('flex-row items-center gap-1 px-2 rounded-md bg-background-neutral-bold dark:bg-background-neutral-bold', className)}>
      <Text numberOfLines={1} className={clsx('font-bold text-font dark:text-font-dark', textClassName)}>
        {label}
      </Text>
      <CloseIcon size={14} onPress={onRemove} />
    </View>
  );
};

export default FilterBadge;
