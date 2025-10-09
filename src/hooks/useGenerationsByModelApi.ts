import { useQuery } from "@tanstack/react-query";
import { SimpleAutoApi } from "@/openapi/client";

export const useGenerationsByModelApi = (brandId: string | null, modelId: string | null) => {
  const simpleAutoClient = new SimpleAutoApi();

  return useQuery({
    queryKey: ["generations", brandId, modelId],
    queryFn: async () => {
      if (!brandId || !modelId) return [];
      
      const response = await simpleAutoClient.getAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations({
        brandId,
        modelId,
      });
      
      return response;
    },
    enabled: !!brandId && !!modelId,
  });
};