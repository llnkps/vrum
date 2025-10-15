import { useState, useEffect } from 'react';
import { FavoritesTab } from '@/constants/navigation';
import { FavoriteItem, SubscriptionItem } from '@/modules/favorites/types';

export const useFavorites = () => {
	const [tab, setTab] = useState<FavoritesTab>(FavoritesTab.FAVORITES);
	const [favoritesData, setFavoritesData] = useState<FavoriteItem[]>([]);
	const [subscriptionsData, setSubscriptionsData] = useState<
		SubscriptionItem[]
	>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		try {
			setLoading(true);
			setError(null);

			// TODO: Заменить на реальные API вызовы
			// const favoritesResponse = await api.getFavorites();
			// const subscriptionsResponse = await api.getSubscriptions();

			// Mock данные для тестирования
			const mockFavorites: FavoriteItem[] = [
				{
					id: '1',
					title: 'Porsche 911 Brabus 900',
					subtitle: '2023 г., 16 000 км',
					price: '89 900 000 ₽',
					tag: 'Новый',
					description:
						'Эксклюзивный тюнинг от Brabus. Автомобиль в идеальном состоянии.',
					location: 'Москва',
					images: [
						'https://motor.ru/thumb/1816x0/filters:quality(75):no_upscale()/imgs/2023/07/06/11/5974391/bd6439ef2f6dc0cc152386bfebb547ec4582bbfe.jpg',
					],
				},
				{
					id: '2',
					title: 'BMW M3 Competition',
					subtitle: '2022 г., 25 000 км',
					price: '12 500 000 ₽',
					tag: 'Б/у',
					description: 'Полная комплектация, все опции, без事故.',
					location: 'Санкт-Петербург',
					images: ['https://example.com/car2.jpg'],
				},
			];

			const mockSubscriptions: SubscriptionItem[] = [
				{
					id: '1',
					brand: 'Porsche',
					model: '911',
					info: 'Новые объявления',
					count: '12',
					logo: 'https://example.com/porsche-logo.png',
				},
				{
					id: '2',
					brand: 'BMW',
					model: 'M3',
					info: 'Цена до 15 млн',
					count: '8',
					logo: 'https://example.com/bmw-logo.png',
				},
			];

			setFavoritesData(mockFavorites);
			setSubscriptionsData(mockSubscriptions);
		} catch (err) {
			setError('Ошибка загрузки данных');
			console.error('Error loading favorites data:', err);
		} finally {
			setLoading(false);
		}
	};

	// Обработчики для избранного
	const handleFavoriteItemPress = (item: FavoriteItem) => {
		console.log('Открыть объявление:', item.title);
	};

	const handleToggleFavorite = (id: string) => {
		setFavoritesData(prev => prev.filter(item => item.id !== id));
		console.log('Удалить из избранного:', id);
	};

	const handleSearchPress = () => {
		console.log('Перейти к поиску объявлений');
	};

	// Обработчики для подписок
	const handleSubscriptionItemPress = (item: SubscriptionItem) => {
		console.log('Открыть подписку:', item.brand);
	};

	const handleDeleteSubscription = (id: string) => {
		setSubscriptionsData(prev => prev.filter(item => item.id !== id));
		console.log('Удалить подписку:', id);
	};

	const handleEditSubscription = (id: string) => {
		console.log('Редактировать подписку:', id);
	};

	return {
		tab,
		setTab,
		favoritesData,
		subscriptionsData,
		loading,
		error,
		handlers: {
			handleFavoriteItemPress,
			handleToggleFavorite,
			handleSearchPress,
			handleSubscriptionItemPress,
			handleDeleteSubscription,
			handleEditSubscription,
		},
	};
};
