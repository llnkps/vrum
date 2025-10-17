import { RegionApi } from '@/openapi/client';
import { useQuery } from '@tanstack/react-query';

export const useRegionApi = () => {
  const regionApi = new RegionApi();

  return useQuery({
    queryKey: ['regions'],
    queryFn: async () => {
      return regionApi.getRegionIndex();
    },
  });
};
