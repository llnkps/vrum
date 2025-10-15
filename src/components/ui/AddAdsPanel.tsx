import React from 'react';
import { Text, View } from 'react-native';
import { AdsCategory } from '@/constants/navigation';
import { useRouter } from 'expo-router';
import { CategoryButton } from './button/CategoryButton';

interface BottomBarProps {
	onAddAd: (category: AdsCategory) => void;
}

export const AddAdsPanel: React.FC<BottomBarProps> = () => {
	const router = useRouter();

	return (
		<View className='absolute bottom-16 left-0 right-0 bg-surface dark:bg-surface-dark rounded-t-3xl px-4 pt-6 pb-10 shadow-lg border-t border-border dark:border-border-dark'>
			{/* Заголовок */}
			<Text className='text-font dark:text-font-dark text-lg font-bold mb-4'>
				Добавить объявление
			</Text>

			{/* Кнопки категорий */}
			<View className='flex-row justify-between'>
				<CategoryButton
					title='Автомобили'
					icon='car-outline'
					onPress={() => router.push('/(app)/advertisement/simple-auto')}
				/>
				<CategoryButton
					title='Мотоциклы'
					icon='bicycle-outline'
					onPress={() => console.log('Мотоциклы')}
				/>
				<CategoryButton
					title='Запчасти'
					icon='settings-outline'
					onPress={() => console.log('Запчасти')}
				/>
			</View>
		</View>
	);
};
