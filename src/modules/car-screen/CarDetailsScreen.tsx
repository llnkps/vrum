import React, { useState, useMemo, useCallback, memo } from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	StatusBar,
	ActivityIndicator,
	useWindowDimensions,
	type NativeSyntheticEvent,
	type NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

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

interface CarDetailsScreenProps {
	productData: ProductData;
	onBack?: () => void;
	onCall?: () => void;
	onChat?: () => void;
	onToggleFavorite?: (isFavorite: boolean) => void;
	loading?: boolean;
	error?: string | null;
	isFavorite?: boolean;
}

// Компонент спецификации (мемоизирован для оптимизации)
const SpecificationRow = memo<{
	label: string;
	value: string;
	highlighted?: boolean;
}>(({ label, value, highlighted }) => (
	<View className='flex-row justify-between items-center py-1'>
		<Text className='text-font-subtle dark:text-font-subtle-dark text-base flex-1'>
			{label}
		</Text>
		<Text
			className={`text-base text-right flex-1 ${
				highlighted
					? 'text-font-brand dark:text-font-brand-dark font-medium'
					: 'text-font dark:text-font-dark'
			}`}
		>
			{value}
		</Text>
	</View>
));

SpecificationRow.displayName = 'SpecificationRow';

function CarDetailsScreen({
	productData,
	onBack,
	onCall,
	onChat,
	onToggleFavorite,
	loading = false,
	error = null,
	isFavorite = false,
}: CarDetailsScreenProps) {
	const { width } = useWindowDimensions();
	const [showAllSpecs, setShowAllSpecs] = useState(false);
	const [scrollY, setScrollY] = useState(0);

	// Форматирование цены
	const formattedPrice = useMemo(() => {
		const price = parseFloat(productData.price);
		const currencySymbol = productData.currency === 'usd' ? '$' : 'mdl';
		return `${price.toLocaleString('ru-RU')} ${currencySymbol}`;
	}, [productData.price, productData.currency]);

	// Разделение параметров на основные и дополнительные
	const { mainSpecs, additionalSpecs } = useMemo(() => {
		const params = productData.parameters || [];
		const main = params.slice(0, 7);
		const additional = params.slice(7);
		return { mainSpecs: main, additionalSpecs: additional };
	}, [productData.parameters]);

	const displaySpecs = showAllSpecs
		? [...mainSpecs, ...additionalSpecs]
		: mainSpecs;
	const showHeaderInfo = scrollY > 200;

	// Мемоизированный обработчик скролла
	const handleScroll = useCallback(
		(event: NativeSyntheticEvent<NativeScrollEvent>) => {
			setScrollY(event.nativeEvent.contentOffset.y);
		},
		[]
	);

	// Мемоизированный обработчик переключения избранного
	const handleToggleFavorite = useCallback(() => {
		onToggleFavorite?.(!isFavorite);
	}, [onToggleFavorite, isFavorite]);

	if (loading) {
		return (
			<SafeAreaView className='flex-1 bg-background-page dark:bg-background-page-dark items-center justify-center'>
				<ActivityIndicator size='large' color='#00A86B' />
			</SafeAreaView>
		);
	}

	if (error) {
		return (
			<SafeAreaView className='flex-1 bg-background-page dark:bg-background-page-dark items-center justify-center px-4'>
				<Text className='text-font dark:text-font-dark text-center mb-4'>
					{error}
				</Text>
				<TouchableOpacity
					className='bg-background-success-bold dark:bg-background-success-bold-dark py-3 px-6 rounded-xl'
					onPress={onBack}
				>
					<Text className='text-white text-base font-medium'>Назад</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView className='flex-1 bg-background-page dark:bg-background-page-dark'>
			{/* Header */}
			<View className='flex-row justify-between items-center px-4 pb-3'>
				<View className='flex-row items-center gap-3'>
					<TouchableOpacity className='p-1 active:opacity-70' onPress={onBack}>
						<Ionicons name='arrow-back' size={24} color='#fff' />
					</TouchableOpacity>
				</View>

				<View className='flex-1 items-center justify-center px-2'>
					{showHeaderInfo && (
						<View className='items-center'>
							<Text
								className='text-font dark:text-font-dark text-sm font-semibold'
								numberOfLines={1}
							>
								{productData.name}, {productData.releaseYear}
							</Text>
							<Text className='text-font-dark text-base font-bold'>
								{formattedPrice}
							</Text>
						</View>
					)}
				</View>

				<View className='flex-row items-center gap-3'>
					<TouchableOpacity className='p-1' onPress={handleToggleFavorite}>
						<Ionicons
							name={isFavorite ? 'heart' : 'heart-outline'}
							size={24}
							color='#fff'
						/>
					</TouchableOpacity>
					<TouchableOpacity className='p-1'>
						<Ionicons name='ellipsis-horizontal' size={24} color='#fff' />
					</TouchableOpacity>
				</View>
			</View>

			{/* Main content */}
			<ScrollView
				className='flex-1'
				showsVerticalScrollIndicator={false}
				onScroll={handleScroll}
				scrollEventThrottle={16}
			>
				{/* Image */}
				<View className='relative' style={{ width, height: 300 }}>
					{productData.imageUri ? (
						<Image
							source={{ uri: productData.imageUri }}
							className='w-full h-full'
							resizeMode='cover'
						/>
					) : (
						<View className='w-full h-full bg-gray-200 dark:bg-gray-700 items-center justify-center'>
							<Ionicons name='car-outline' size={64} color='#9CA3AF' />
						</View>
					)}
				</View>

				{/* Title and Price */}
				<View className='p-4'>
					<Text className='text-font dark:text-font-dark text-xl font-semibold mb-2'>
						{`${productData.brand} ${productData.model}, ${productData.releaseYear}`}
					</Text>
					<Text className='text-font-brand dark:text-font-brand-dark text-4xl font-bold mb-1'>
						{formattedPrice}
					</Text>
					<Text className='text-font-subtlest dark:text-font-subtlest-dark text-sm'>
						{productData.region}
					</Text>
				</View>

				{/* Description */}
				{productData.description && (
					<View className='bg-surface dark:bg-surface-dark mx-4 mt-2 p-5 rounded-2xl'>
						<Text className='text-font dark:text-font-dark text-xl font-semibold mb-3'>
							Описание
						</Text>
						<Text className='text-font-subtle dark:text-font-subtle-dark text-base leading-6'>
							{productData.description}
						</Text>
					</View>
				)}

				{/* Specifications */}
				{displaySpecs.length > 0 && (
					<View className='bg-surface dark:bg-surface-dark mx-4 mt-2 p-5 rounded-2xl'>
						<Text className='text-font dark:text-font-dark text-xl font-semibold mb-4'>
							Характеристики
						</Text>

						<View className='gap-3'>
							{displaySpecs.map((spec, index) => (
								<SpecificationRow
									key={`${spec.label}-${index}`}
									label={spec.label}
									value={spec.value}
									highlighted={spec.highlighted}
								/>
							))}
						</View>

						{!showAllSpecs && additionalSpecs.length > 0 && (
							<TouchableOpacity
								className='bg-background-neutral-subtle pressed:bg-background-neutral-subtle-pressed dark:bg-background-neutral-subtle-dark py-3.5 rounded-xl mt-4 items-center active:opacity-80'
								onPress={() => setShowAllSpecs(true)}
							>
								<Text className='text-font dark:text-font-dark text-base font-medium'>
									Все характеристики
								</Text>
							</TouchableOpacity>
						)}
					</View>
				)}

				<View className='h-24' />
			</ScrollView>
		</SafeAreaView>
	);
}

export default memo(CarDetailsScreen);
