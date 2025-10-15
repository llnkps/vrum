import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TabButtonProps {
	title: string;
	isActive: boolean;
	onPress: () => void;
	icon?: string;
}

export const SegmentedButton: React.FC<TabButtonProps> = ({
	title,
	isActive,
	onPress,
	icon,
}) => (
	<TouchableOpacity
		className={`flex-1 py-3 rounded-lg 
      ${
				isActive
					? 'bg-background-brand-bold dark:bg-background-brand-bold-dark'
					: 'bg-background-neutral-subtle dark:bg-background-neutral-subtle-dark'
			}`}
		onPress={onPress}
		activeOpacity={0.7}
	>
		<View className='flex-row items-center justify-center'>
			{icon && (
				<Ionicons
					name={icon as any}
					size={18}
					color='white'
					style={{ marginRight: 6 }}
				/>
			)}
			<Text className='text-center text-white font-medium'>{title}</Text>
		</View>
	</TouchableOpacity>
);
