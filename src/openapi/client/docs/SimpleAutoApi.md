# SimpleAutoApi

All URIs are relative to *http://192.168.100.8:8000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createSimpleAutoAdvertisement**](SimpleAutoApi.md#createsimpleautoadvertisement) | **POST** /api/simple-auto/advertisments |  |
| [**getSimpleAutoAdvertisement**](SimpleAutoApi.md#getsimpleautoadvertisement) | **GET** /api/simple-auto/advertisments/{advertismentId}/{_locale} | Get single advertisement |
| [**getSimpleAutoBrands**](SimpleAutoApi.md#getsimpleautobrands) | **GET** /api/simple-auto/brands |  |
| [**getSimpleAutoCollectionPagination**](SimpleAutoApi.md#getsimpleautocollectionpagination) | **GET** /api/simple-auto/advertisments | Get simple auto collection pagination |
| [**getSimpleAutoGenerations**](SimpleAutoApi.md#getsimpleautogenerations) | **GET** /api/simple-auto/brands/{brandId}/models/{modelId}/generations |  |
| [**getSimpleAutoModels**](SimpleAutoApi.md#getsimpleautomodels) | **GET** /api/simple-auto/brands/{brandId}/models |  |



## createSimpleAutoAdvertisement

> createSimpleAutoAdvertisement()



### Example

```ts
import {
  Configuration,
  SimpleAutoApi,
} from '';
import type { CreateSimpleAutoAdvertisementRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SimpleAutoApi(config);

  try {
    const data = await api.createSimpleAutoAdvertisement();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

`void` (Empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Advertisment created |  -  |
| **400** | Invalid input |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSimpleAutoAdvertisement

> AdvertisementWithFiltersResponse getSimpleAutoAdvertisement(advertismentId, locale)

Get single advertisement

Get single advertisement by ID

### Example

```ts
import {
  Configuration,
  SimpleAutoApi,
} from '';
import type { GetSimpleAutoAdvertisementRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SimpleAutoApi(config);

  const body = {
    // number
    advertismentId: 1,
    // 'en' | 'ro' | 'ru' | 'uk'
    locale: locale_example,
  } satisfies GetSimpleAutoAdvertisementRequest;

  try {
    const data = await api.getSimpleAutoAdvertisement(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **advertismentId** | `number` |  | [Defaults to `undefined`] |
| **locale** | `en`, `ro`, `ru`, `uk` |  | [Defaults to `undefined`] [Enum: en, ro, ru, uk] |

### Return type

[**AdvertisementWithFiltersResponse**](AdvertisementWithFiltersResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Returns advertisement details |  -  |
| **404** | Advertisement not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSimpleAutoBrands

> Array&lt;SimpleAutoBrand&gt; getSimpleAutoBrands()



### Example

```ts
import {
  Configuration,
  SimpleAutoApi,
} from '';
import type { GetSimpleAutoBrandsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SimpleAutoApi(config);

  try {
    const data = await api.getSimpleAutoBrands();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;SimpleAutoBrand&gt;**](SimpleAutoBrand.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Returns brands |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSimpleAutoCollectionPagination

> GetSimpleAutoCollectionPagination200Response getSimpleAutoCollectionPagination(page, limit, b, f, sort)

Get simple auto collection pagination

Get simple auto collection pagination

### Example

```ts
import {
  Configuration,
  SimpleAutoApi,
} from '';
import type { GetSimpleAutoCollectionPaginationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SimpleAutoApi(config);

  const body = {
    // string
    page: 1,
    // string
    limit: 25,
    // { [key: string]: any; } | Brand of the product (optional)
    b: Object,
    // { [key: string]: any; } | Additional filters for the product as key-value pairs. Values can be strings, arrays of strings, or objects with from/to properties. (optional)
    f: Object,
    // { [key: string]: any; } | Sort options as object with field names as keys and direction (asc/desc) as values. Allowed fields: createdAt, price, releaseYear, mileage, engine_capacity (optional)
    sort: {"price": "asc", "createdAt": "desc"},
  } satisfies GetSimpleAutoCollectionPaginationRequest;

  try {
    const data = await api.getSimpleAutoCollectionPagination(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **page** | `string` |  | [Defaults to `undefined`] |
| **limit** | `string` |  | [Defaults to `undefined`] |
| **b** | `{ [key: string]: any; }` | Brand of the product | [Optional] |
| **f** | `{ [key: string]: any; }` | Additional filters for the product as key-value pairs. Values can be strings, arrays of strings, or objects with from/to properties. | [Optional] |
| **sort** | `{ [key: string]: any; }` | Sort options as object with field names as keys and direction (asc/desc) as values. Allowed fields: createdAt, price, releaseYear, mileage, engine_capacity | [Optional] |

### Return type

[**GetSimpleAutoCollectionPagination200Response**](GetSimpleAutoCollectionPagination200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Returns paginated advertisements |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSimpleAutoGenerations

> Array&lt;SimpleAutoGeneration&gt; getSimpleAutoGenerations(brandId, modelId)



### Example

```ts
import {
  Configuration,
  SimpleAutoApi,
} from '';
import type { GetSimpleAutoGenerationsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SimpleAutoApi(config);

  const body = {
    // string
    brandId: brandId_example,
    // string
    modelId: modelId_example,
  } satisfies GetSimpleAutoGenerationsRequest;

  try {
    const data = await api.getSimpleAutoGenerations(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **brandId** | `string` |  | [Defaults to `undefined`] |
| **modelId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;SimpleAutoGeneration&gt;**](SimpleAutoGeneration.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Returns generation |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSimpleAutoModels

> Array&lt;SimpleAutoModel&gt; getSimpleAutoModels(brandId)



### Example

```ts
import {
  Configuration,
  SimpleAutoApi,
} from '';
import type { GetSimpleAutoModelsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SimpleAutoApi(config);

  const body = {
    // string
    brandId: brandId_example,
  } satisfies GetSimpleAutoModelsRequest;

  try {
    const data = await api.getSimpleAutoModels(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **brandId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;SimpleAutoModel&gt;**](SimpleAutoModel.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Returns models of a brand |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

