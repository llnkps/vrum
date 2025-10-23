import i18n from '@/i18n';
import { Language, usePreferencesStore } from '@/state/preferences/usePreferencesStore';
import { useThemeStore } from '@/state/theme/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function LanguageSelectPage() {
  const router = useRouter();
  const { language, setLanguage } = usePreferencesStore();
  const { isDark } = useThemeStore();

  const checkIconColor = isDark ? '#BFC1C4' : '#292A2E';

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
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <ScrollView className="px-5 py-4" showsVerticalScrollIndicator={false}>
          {languages.map(lang => (
            <TouchableOpacity
              key={lang}
              className="flex-row items-center border-b border-border/10 py-4 dark:border-border-dark/10"
              onPress={() => handleLanguageChange(lang)}
            >
              <Text className="flex-1 text-lg text-font dark:text-font-dark">{getLanguageDisplayName(lang)}</Text>
              {language === lang && <Ionicons name="checkmark" size={24} color={checkIconColor} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
