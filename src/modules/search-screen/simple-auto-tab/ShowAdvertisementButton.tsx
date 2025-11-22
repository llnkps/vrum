import { CustomRectButton } from '@/components/ui/button';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

export const ShowAdvertisementButton = React.memo(() => {
  const router = useRouter();
  const { t } = useTranslation();
  const searchParams = useLocalSearchParams();

  return (
    <CustomRectButton
      onPress={() => {
        // Navigate based on source
        if (searchParams.from === 'settings') {
          router.dismiss();
        } else {
          router.replace('/(app)/search-screen/simple-auto-screen/simple-auto-modal');
        }
      }}
      appearance="primary"
    >
      <Text className="text-center font-semibold text-white">{t('searchScreen.simpleAuto.searchPlaceholder')}</Text>
    </CustomRectButton>
  );
});

ShowAdvertisementButton.displayName = 'ShowAdvertisementButton';
