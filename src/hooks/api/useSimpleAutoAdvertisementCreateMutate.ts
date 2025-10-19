import { createAuthenticatedApiCall } from '@/openapi/auth-utils';
import { ResponseError, SimpleAutoApi } from '@/openapi/client';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';
import { useMutation } from '@tanstack/react-query';

type props = {
  onSuccess?: (data: any) => void;
  onError?: (error: ResponseError) => void;
};

export function useSimpleAutoAdvertisementCreateMutate({ onSuccess, onError }: props) {
  console.log('useSimpleAutoAdvertisementCreateMutate called');
  console.log('useSimpleAutoAdvertisementCreateMutate called');
  console.log('useSimpleAutoAdvertisementCreateMutate called');

  const simpleAutoClient = new SimpleAutoApi(createAuthenticatedConfiguration());

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const formParams = new FormData();

      formParams.append('description', formData.get('description') as any);
      formParams.append('price', formData.get('price') as any);
      formParams.append('currency', formData.get('currency') as any);
      formParams.append('region', formData.get('region') as any);
      formParams.append('releaseYear', formData.get('releaseYear') as any);
      formParams.append('brand', formData.get('brand') as any);
      formParams.append('model', formData.get('model') as any);
      formParams.append('generationId', formData.get('generationId') as any);
      formParams.append('modificationId', formData.get('modificationId') as any);

      formParams.append('parameters[mileage]', formData.get('mileage') as any);
      formParams.append('parameters[transmission]', formData.get('transmission_type') as any);
      formParams.append('parameters[fuel_type]', formData.get('fuel_type') as any);
      formParams.append('parameters[frame_type]', formData.get('frame_type') as any);
      formParams.append('parameters[drivetrain_type]', formData.get('drive_train') as any);
      formParams.append('parameters[color]', formData.get('color') as any);
      formParams.append('parameters[power]', formData.get('power') as any);
      formParams.append('parameters[engine_capacity]', formData.get('engine_capacity') as any);
      formParams.append('parameters[trade_allow]', formData.get('trade_allow') ? '1' : '0');
      formParams.append('parameters[condition]', formData.get('condition') as any);
      formParams.append('parameters[number_of_owner]', formData.get('number_of_owner') as any);
      formParams.append('parameters[document_type]', formData.get('document_ok'));
      formParams.append('parameters[seller]', formData.get('seller') as any);

      formData.getAll('images').forEach(element => {
        formParams.append('images[]', element as any);
      });

      const res = createAuthenticatedApiCall(async () => {
        return await simpleAutoClient.postAppSimpleautocontextPresentationSimpleautocreateCreateRaw({
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formParams,
        });
      });

      // const res = await simpleAutoClient.postAppSimpleautocontextPresentationSimpleautocreateCreateRaw({
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      //   body: formParams,
      // });

      return res;
    },
    onSuccess: onSuccess,
    onError: onError,
  });

  // return createAuthenticatedRouteHandler(request, async (authConfig) => {
  //   const { productSlug, employeeSlug } = await params;
  //   const employeeApi = new EmployeeApi(authConfig.configuration);

  //   return await employeeApi.getAppEmployeedomainPresentationEmployeegetonebyproductbyemployeeslugGetone({
  //     productSlug,
  //     employeeSlug
  //   });
  // });
}
