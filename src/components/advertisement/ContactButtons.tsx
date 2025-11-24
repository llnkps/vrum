import { CustomTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { memo } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

const ContactButtons = memo(() => {
  const theme = useTheme() as CustomTheme;
  return (
    <View
      className="absolute bottom-0 left-0 right-0 flex-row gap-2 rounded-t-2xl p-4"
      style={{ backgroundColor: theme.colors.background, paddingBottom: Platform.OS === 'ios' ? 34 : 20 }}
    >
      <TouchableOpacity
        className="flex-1 items-center justify-center rounded-2xl py-4 active:opacity-80"
        style={{ backgroundColor: theme.colors.button.primary }}
        onPress={() => console.log('call')}
        accessibilityLabel="Позвонить продавцу"
      >
        <Text className="text-base font-semibold" style={{ color: theme.colors.text }}>
          Позвонить
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="h-16 w-16 items-center justify-center rounded-2xl active:opacity-80"
        onPress={() => console.log('chat')}
        style={{ backgroundColor: theme.colors.button.primary }}
        accessibilityLabel="Написать сообщение продавцу"
      >
        <Ionicons name="chatbubble-outline" size={24} color={theme.colors.icon} />
      </TouchableOpacity>
    </View>
  );
});

ContactButtons.displayName = 'ContactButtons';

export default ContactButtons;
