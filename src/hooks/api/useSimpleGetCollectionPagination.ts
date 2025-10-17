import { SimpleAutoApi } from '@/openapi/client';
import { useInfiniteQuery } from '@tanstack/react-query';

type props = {
  brand?: string;
  model?: string;
  releaseYear?: number;
  price?: string;
  page?: string;
  pageSize?: string;
};

export const useSimpleGetCollectionPagination = ({
  brand,
  model,
  releaseYear,
  price,
  pageSize,
}: Omit<props, 'page'>) => {
  const simpleAutoApi = new SimpleAutoApi();

  return useInfiniteQuery({
    queryKey: ['advertisement-simple-auto-pagination', brand, model, releaseYear, price],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await simpleAutoApi.getSimpleAutoCollectionPagination({
        page: pageParam.toString(),
        limit: pageSize || '10',
        brand: brand,
        model: model,
        releaseYear: releaseYear,
        price: price,
      });

      return {
        data: response.items || [],
        currentPage: response.currentPage || pageParam,
        total: response.total || 0,
        perPage: response.perPage || parseInt(pageSize || '10'),
        hasNextPage:
          (response.currentPage || pageParam) * (response.perPage || parseInt(pageSize || '10')) <
          (response.total || 0),
      };
    },
    getNextPageParam: lastPage => {
      if (lastPage.hasNextPage) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
  });
};
