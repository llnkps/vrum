import i18n from '@/i18n';
import { Language, usePreferencesStore } from '@/state/preferences/usePreferencesStore';
import { CustomTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LanguageSelectPage() {
  const router = useRouter();
  const { language, setLanguage } = usePreferencesStore();

  const theme = useTheme() as CustomTheme;

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    router.back();
  };

  const getLanguageDisplayName = (lang: Language) => {
    const names = {
      en: 'English',
      ro: 'Română',
      ru: 'Русский',
      uk: 'Українська',
    };
    return names[lang];
  };

  const languages: Language[] = ['en', 'ro', 'ru', 'uk'];

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: theme.colors.backgroundNeutral }}>
      <ScrollView className="px-5 py-4" showsVerticalScrollIndicator={false}>
        {languages.map(lang => (
          <TouchableOpacity
            key={lang}
            className="flex-row items-center border-b py-4"
            style={{ borderBottomColor: theme.colors.border }}
            onPress={() => handleLanguageChange(lang)}
          >
            <Text className="flex-1 text-lg" style={{ color: theme.colors.text }}>
              {getLanguageDisplayName(lang)}
            </Text>
            {language === lang && <Ionicons name="checkmark" size={24} color={theme.colors.text} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
