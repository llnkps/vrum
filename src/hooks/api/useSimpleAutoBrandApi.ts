import { SimpleAutoApi } from '@/openapi/client';
import { useQuery } from '@tanstack/react-query';

export const useSimpleAutoBrandApi = () => {
  const simpleAutoApi = new SimpleAutoApi();

  return useQuery({
    queryKey: ['auto-brands'],
    queryFn: async () => {
      return simpleAutoApi.getSimpleAutoBrands();
    },
  });
};
