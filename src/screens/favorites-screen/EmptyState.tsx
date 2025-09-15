import {Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

type EmptyStateProps = {
  type: 'favorites' | 'subscriptions';
  onActionPress?: () => void;
};

const EmptyStateContent = ({ type }: EmptyStateProps) => {
  const isFavorites = type === 'favorites';

  return (
    <View className="flex-1 justify-center items-center px-6">
      <Ionicons
        name={isFavorites ? "star-outline" : "notifications-outline"  }
        size={64}
        color="#9CA3AF"
        style={{ marginBottom: 20 }}
      />
      <Text className="text-gray-800 text-center text-lg font-semibold mb-3">
        {isFavorites ? "Избранное пусто" : "Нет активных подписок" }
      </Text>

      <Text className="text-gray-600 text-center text-base leading-6">
        {isFavorites
          ? "Вы можете сохранить интересные объявления, добавив их в избранное"
          : "Сохраняйте поисковые запросы - как только появится подходящее объявление, вы сразу же получите уведомление!"
        }
      </Text>

      {isFavorites && (
        <TouchableOpacity
          className="bg-amber-600 px-6 py-3 rounded-lg mt-6"
          activeOpacity={0.8}
          onPress={() => console.log('Перейти к объявлениям')}
        >
          <Text className="text-white font-semobild">
            Смотреть объявления
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default EmptyStateContent;