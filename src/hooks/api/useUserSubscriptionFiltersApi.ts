import { createAuthenticatedApiCall } from '@/openapi/auth-utils';
import { UserSubscriptionFilterApi } from '@/openapi/client';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';
import { useQuery } from '@tanstack/react-query';

export const useUserSubscriptionFiltersApi = () => {
  return useQuery({
    queryKey: ['user-subscription-filters'],
    queryFn: async () => {
      return createAuthenticatedApiCall(async () => {
        const userSubscriptionFilterApi = new UserSubscriptionFilterApi(createAuthenticatedConfiguration());
        return userSubscriptionFilterApi.getUserSubscriptionFilters();
      });
    },
    retry: 0,
    gcTime: 5,
    staleTime: 5,
  });
};
