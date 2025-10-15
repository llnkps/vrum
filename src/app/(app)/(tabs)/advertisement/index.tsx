import { CarCard } from '@/components/CarCard';
import { AddAdsPanel } from '@/components/ui/AddAdsPanel';
import { Button } from '@/components/ui/button';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyAdvertisement() {
	const router = useRouter();

	// Mock data for the car card
	const exampleCarData = {
		imageUri:
			'https://motor.ru/thumb/1816x0/filters:quality(75):no_upscale()/imgs/2023/07/06/11/5974391/bd6439ef2f6dc0cc152386bfebb547ec4582bbfe.jpg',
		name: 'Porsche 911 Brabus 900 Rocket R',
		description: 'Эксклюзивный тюнинг от Brabus...',
		brand: 'Porsche',
		model: '911 Brabus 900',
		price: '89900000',
		currency: 'rub',
		region: 'Москва',
		releaseYear: 2023,
		parameters: [
			{ label: 'Поколение', value: 'VIII (992)', highlighted: true },
			{ label: 'Пробег', value: '160000' },
		],
	};

	return (
		<SafeAreaView className='flex-1 bg-background-page dark:bg-background-page-dark'>
			<View className='flex-1'>
				{/* Title */}
				<View className='px-4 pt-5 pb-6'>
					<Text className='text-font dark:text-font-dark text-2xl font-bold'>
						Мои объявления
					</Text>
				</View>

				{/* Tabs */}
				<View className='flex-row justify-between bg-surface dark:bg-surface-dark rounded-lg'>
					<Button
						style={{ flex: 1 }}
						appearance='subtle'
						title='Акутальные'
						isSelected={true}
					/>
					<Button
						style={{ flex: 1 }}
						appearance='subtle'
						title='Архив'
						isSelected={false}
						onPress={() => router.push('/(app)/(tabs)/advertisement/archived')}
					/>
				</View>

				{/* Content */}
				<View className='flex-1 justify-center items-center'></View>
			</View>

			{/* Bottom bar */}
			<AddAdsPanel onAddAd={() => console.log('error')} />
		</SafeAreaView>
	);
}
