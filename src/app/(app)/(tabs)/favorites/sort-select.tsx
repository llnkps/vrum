import { useFavoritesStore } from '@/state/favorites/useFavoritesStore';
import { CustomTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

export default function SortMethodSelectPage() {
  const router = useRouter();
  const theme = useTheme() as CustomTheme;
  const { sortMethod, setSortMethod } = useFavoritesStore();

  const handleSortChange = (method: string) => {
    setSortMethod(method);
    // TODO: Apply sorting logic here
    console.log('Selected sort method:', method);
    router.back();
  };

  const sortMethods = [
    'Актульности',
    'Дате размещения',
    'Возрастанию цены',
    'Убыванию цены',
    'Году выпуска: новее',
    'Году выпуска: старее',
    'Пробегу',
    'Названию',
  ];

  return (
    <ScrollView className="px-5 py-4" showsVerticalScrollIndicator={false} style={{ backgroundColor: theme.colors.backgroundNeutral }}>
      {sortMethods.map(method => (
        <TouchableOpacity
          key={method}
          className="flex-row items-center border-b py-4"
          style={{ borderBottomColor: theme.colors.border }}
          onPress={() => handleSortChange(method)}
        >
          <Text className="flex-1 text-lg" style={{ color: theme.colors.text }}>
            {method}
          </Text>
          {sortMethod === method && <Ionicons name="checkmark" size={24} color={theme.colors.icon} />}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
