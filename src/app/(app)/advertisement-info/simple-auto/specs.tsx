// src/app/(app)/advertisement-info/simple-auto/specs.tsx
import React, { useMemo } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { createAuthenticatedApiCall } from '@/openapi/auth-utils';
import { SimpleAutoApi } from '@/openapi/client/apis/SimpleAutoApi';
import { AdvertisementWithFiltersResponse } from '@/openapi/client/models/AdvertisementWithFiltersResponse';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';
import { CustomTheme } from '@/theme';
import Header from '@/components/advertisement/Header';
import Specifications from '@/components/advertisement/Specifications';

export default function SpecsScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme() as CustomTheme;

  const advertisementId = parseInt(params.id || '0');

  const { data, isLoading, error } = useQuery<AdvertisementWithFiltersResponse>({
    queryKey: ['advertisement', advertisementId],
    queryFn: async () => {
      const api = new SimpleAutoApi(createAuthenticatedConfiguration());
      return await createAuthenticatedApiCall(async () => {
        return await api.getSimpleAutoAdvertisement({
          advertismentId: advertisementId,
          locale: 'ru',
        });
      });
    },
    enabled: advertisementId > 0,
  });

  const displaySpecs = useMemo(() => data?.filterParameters || [], [data?.filterParameters]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center" style={{ backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  if (error || !data) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center px-4" style={{ backgroundColor: theme.colors.background }}>
        <Text className="mb-4 text-center" style={{ color: theme.colors.text }}>
          {error ? 'Ошибка загрузки характеристик' : 'Характеристики не найдены'}
        </Text>
        <TouchableOpacity
          className="rounded-xl bg-background-success-bold px-6 py-3 dark:bg-background-success-bold-dark"
          onPress={() => router.back()}
        >
          <Text className="text-base font-medium text-white">Назад</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: theme.colors.background }}>
      {/* Header */}
      <Header data={data} formattedPrice="" scrollY={0} onToggleFavorite={() => console.log('favorite')} onShare={() => console.log('share')} />

      {/* Main content */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Specifications - все характеристики */}
        <Specifications displaySpecs={displaySpecs} advertisementId={advertisementId} />
      </ScrollView>
    </SafeAreaView>
  );
}
