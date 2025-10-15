import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type EmptyStateProps = {
	type: 'favorites' | 'subscriptions';
	onActionPress?: () => void;
};

const EmptyState = ({ type }: EmptyStateProps) => {
	const scheme = useColorScheme();
	const isFavorites = type === 'favorites';
	const router = useRouter();

	const iconColor = scheme === 'dark' ? '#96999E' : '#6B6E76';

	return (
		<View className='flex-1 justify-center items-center px-6'>
			<Ionicons
				name={isFavorites ? 'star-outline' : 'notifications-outline'}
				size={64}
				color={iconColor}
				style={{ marginBottom: 20 }}
			/>
			<Text className='text-font dark:text-font-dark text-center text-lg font-semibold mb-3'>
				{isFavorites ? 'Избранное пусто' : 'Нет активных подписок'}
			</Text>

			<Text className='text-font-subtle dark:text-font-subtle-dark text-center text-base leading-6'>
				{isFavorites
					? 'Вы можете сохранить интересные объявления, добавив их в избранное'
					: 'Сохраняйте поисковые запросы - как только появится подходящее объявление, вы сразу же получите уведомление!'}
			</Text>

			{isFavorites && (
				<TouchableOpacity
					className='mt-4 bg-background-brand-bold dark:bg-background-brand-bold-dark px-4 py-3 rounded-lg active:bg-background-brand-bold-pressed dark:active:bg-background-brand-bold-dark-pressed'
					activeOpacity={0.8}
					onPress={() => router.push('/(app)/(tabs)/search-tab')}
				>
					<Text className='text-white font-semibold'>Смотреть объявления</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default EmptyState;
