import { createAuthenticatedApiCall } from '@/openapi/auth-utils';
import { UserFavoriteApi } from '@/openapi/client';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useUserFavoritesApi = () => {
  return useQuery({
    queryKey: ['user-favorites'],
    queryFn: async () => {
      return createAuthenticatedApiCall(async () => {
        const userFavoriteApi = new UserFavoriteApi(createAuthenticatedConfiguration());
        return userFavoriteApi.getUserFavorites();
      });
    },
    retry: 2,
    gcTime: 5 * 60 * 1000, // 5 minutes
    staleTime: 30 * 1000, // 30 seconds
  });
};

export const useDeleteUserFavoriteApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return createAuthenticatedApiCall(async () => {
        const userFavoriteApi = new UserFavoriteApi(createAuthenticatedConfiguration());
        return userFavoriteApi.deleteUserFavorite({ id });
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-favorites'] });
    },
  });
};