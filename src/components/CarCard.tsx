import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface ProductParameter {
	label: string;
	value: string;
	highlighted?: boolean;
}

interface ProductData {
	imageUri?: string;
	name?: string;
	description?: string;
	brand: string;
	model: string;
	price: string;
	currency: string;
	region: string;
	releaseYear: number;
	parameters?: ProductParameter[];
}

type CarCardProps = {
	item: ProductData;
	onPress?: () => void;
	onToggleFavorite?: () => void;
};

export const CarCard = ({ item, onPress, onToggleFavorite }: CarCardProps) => {
	// Форматирование цены
	const getFormattedPrice = () => {
		const price = parseFloat(item.price);
		const currencySymbol = item.currency === 'usd' ? '$' : 'mdl';
		return `${price.toLocaleString('ru-RU')} ${currencySymbol}`;
	};

	const router = useRouter();

	return (
		<Pressable
			className='bg-surface dark:bg-surface-dark rounded-xl mb-4 overflow-hidden shadow-sm border border-border dark:border-border-dark'
			onPress={() => {
				const params = new URLSearchParams();
				params.set('data', JSON.stringify(item));
				router.push(`/car-details?${params.toString()}`);
			}}
			android_ripple={{ color: '#f3f4f6' }}
		>
			{/* Фото */}
			<View className='relative' style={{ height: 144 }}>
				{item.imageUri ? (
					<Image
						source={{
							uri: item.imageUri,
						}}
						className='w-full h-full'
						resizeMode='cover'
					/>
				) : (
					<View className='w-full h-full bg-gray-200 items-center justify-center'>
						<Ionicons name='car-outline' size={48} color='#9CA3AF' />
					</View>
				)}
			</View>

			{/* Бренд, модель, год */}
			<View className='px-4 pt-4'>
				<Text
					className='text-font dark:text-font-dark text-lg font-semibold leading-tight'
					numberOfLines={2}
				>
					{item.name || `${item.brand} ${item.model}, ${item.releaseYear}`}
				</Text>
			</View>

			{/* Цена */}
			<View className='px-4 pt-1'>
				<Text className='text-font dark:text-font-dark text-xl font-bold'>
					{getFormattedPrice()}
				</Text>
			</View>

			{/* Город */}
			<View className='px-4 py-2'>
				{item.region && (
					<View className='flex-row items-center'>
						<Ionicons name='location-outline' size={14} color='#9CA3AF' />
						<Text className='text-font-subtlest dark:text-font-subtlest-dark text-sm ml-1'>
							{item.region}
						</Text>
					</View>
				)}
			</View>
		</Pressable>
	);
};
