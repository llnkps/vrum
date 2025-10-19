import { SimpleAutoApi } from '@/openapi/client';
import { useQuery } from '@tanstack/react-query';

export const useSimpleAutoModelByBrandApi = (brandId: string | undefined) => {
  const simpleAutoApi = new SimpleAutoApi();

  return useQuery({
    queryKey: ['auto-brand-modal', brandId],
    queryFn: async () => {
      return simpleAutoApi.getSimpleAutoModels({
        brandId: brandId!,
      });
    },
    enabled: !!brandId,
  });
};
