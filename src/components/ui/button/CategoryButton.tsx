import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, useColorScheme } from 'react-native';

interface AddAdButtonProps {
	title: string;
	icon: string;
	onPress: () => void;
}

export const CategoryButton: React.FC<AddAdButtonProps> = ({
	title,
	icon,
	onPress,
}) => {
	const scheme = useColorScheme();

	const iconColor = scheme === 'dark' ? '#E9F2FE' : '#FFFFFF'; // background.brand.boldest.dark / .DEFAULT

	return (
		<TouchableOpacity
			className='flex-1 flex-row items-center justify-center bg-background-brand-bold dark:bg-background-brand-bold-dark py-4 mx-1 rounded-lg active:bg-background-brand-bold-pressed dark:active:bg-background-brand-bold-dark-pressed'
			onPress={onPress}
			activeOpacity={0.8}
		>
			<Ionicons
				name={icon as any}
				size={20}
				color={iconColor}
				style={{ marginRight: 8 }}
			/>
			<Text className='text-center text-white font-medium'>{title}</Text>
		</TouchableOpacity>
	);
};
