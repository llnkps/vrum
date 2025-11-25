# SpecAutoApi

All URIs are relative to *http://192.168.100.8:8000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAppSpecautocontextPresentationBrandgetcollectionGetbrands**](SpecAutoApi.md#getappspecautocontextpresentationbrandgetcollectiongetbrands) | **GET** /api/spec-auto/brands |  |
| [**getAppSpecautocontextPresentationModelgetcollectionGetcollectionbyfilters**](SpecAutoApi.md#getappspecautocontextpresentationmodelgetcollectiongetcollectionbyfilters) | **GET** /api/spec-auto/brands/{brandId}/models |  |
| [**getAppSpecautocontextPresentationSpecautogetcollectionGetcollectionbyfilters**](SpecAutoApi.md#getappspecautocontextpresentationspecautogetcollectiongetcollectionbyfilters) | **GET** /api/spec-auto/advertisments |  |
| [**getAppSpecautocontextPresentationSpecautogetoneGetcollectionbyfilters**](SpecAutoApi.md#getappspecautocontextpresentationspecautogetonegetcollectionbyfilters) | **GET** /api/spec-auto/advertisments/{advertismentId} |  |
| [**postAppSpecautocontextPresentationSpecautocreateCreate**](SpecAutoApi.md#postappspecautocontextpresentationspecautocreatecreateoperation) | **POST** /api/spec-auto/advertisments |  |



## getAppSpecautocontextPresentationBrandgetcollectionGetbrands

> Array&lt;GetAppSpecautocontextPresentationBrandgetcollectionGetbrands200ResponseInner&gt; getAppSpecautocontextPresentationBrandgetcollectionGetbrands()



### Example

```ts
import {
  Configuration,
  SpecAutoApi,
} from '';
import type { GetAppSpecautocontextPresentationBrandgetcollectionGetbrandsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SpecAutoApi(config);

  try {
    const data = await api.getAppSpecautocontextPresentationBrandgetcollectionGetbrands();
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

[**Array&lt;GetAppSpecautocontextPresentationBrandgetcollectionGetbrands200ResponseInner&gt;**](GetAppSpecautocontextPresentationBrandgetcollectionGetbrands200ResponseInner.md)

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


## getAppSpecautocontextPresentationModelgetcollectionGetcollectionbyfilters

> Array&lt;GetAppSpecautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner&gt; getAppSpecautocontextPresentationModelgetcollectionGetcollectionbyfilters(brandId)



### Example

```ts
import {
  Configuration,
  SpecAutoApi,
} from '';
import type { GetAppSpecautocontextPresentationModelgetcollectionGetcollectionbyfiltersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SpecAutoApi(config);

  const body = {
    // string
    brandId: brandId_example,
  } satisfies GetAppSpecautocontextPresentationModelgetcollectionGetcollectionbyfiltersRequest;

  try {
    const data = await api.getAppSpecautocontextPresentationModelgetcollectionGetcollectionbyfilters(body);
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

[**Array&lt;GetAppSpecautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner&gt;**](GetAppSpecautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner.md)

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


## getAppSpecautocontextPresentationSpecautogetcollectionGetcollectionbyfilters

> Array&lt;GetAppSpecautocontextPresentationSpecautogetcollectionGetcollectionbyfilters200ResponseInner&gt; getAppSpecautocontextPresentationSpecautogetcollectionGetcollectionbyfilters(brand, model, releaseYear, price, additionalFilters)



### Example

```ts
import {
  Configuration,
  SpecAutoApi,
} from '';
import type { GetAppSpecautocontextPresentationSpecautogetcollectionGetcollectionbyfiltersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SpecAutoApi(config);

  const body = {
    // string | Brand of the product (optional)
    brand: Toyota,
    // string | Model of the product (optional)
    model: Corolla,
    // number | Release year of the product (optional)
    releaseYear: 2020,
    // string | Price of the product (optional)
    price: 20000,
    // Array<string> | Additional filters for the product (optional)
    additionalFilters: ...,
  } satisfies GetAppSpecautocontextPresentationSpecautogetcollectionGetcollectionbyfiltersRequest;

  try {
    const data = await api.getAppSpecautocontextPresentationSpecautogetcollectionGetcollectionbyfilters(body);
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
| **brand** | `string` | Brand of the product | [Optional] [Defaults to `undefined`] |
| **model** | `string` | Model of the product | [Optional] [Defaults to `undefined`] |
| **releaseYear** | `number` | Release year of the product | [Optional] [Defaults to `undefined`] |
| **price** | `string` | Price of the product | [Optional] [Defaults to `undefined`] |
| **additionalFilters** | `Array<string>` | Additional filters for the product | [Optional] |

### Return type

[**Array&lt;GetAppSpecautocontextPresentationSpecautogetcollectionGetcollectionbyfilters200ResponseInner&gt;**](GetAppSpecautocontextPresentationSpecautogetcollectionGetcollectionbyfilters200ResponseInner.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Returns products |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAppSpecautocontextPresentationSpecautogetoneGetcollectionbyfilters

> GetAppSpecautocontextPresentationSpecautogetcollectionGetcollectionbyfilters200ResponseInner getAppSpecautocontextPresentationSpecautogetoneGetcollectionbyfilters(advertismentId)



### Example

```ts
import {
  Configuration,
  SpecAutoApi,
} from '';
import type { GetAppSpecautocontextPresentationSpecautogetoneGetcollectionbyfiltersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SpecAutoApi(config);

  const body = {
    // string
    advertismentId: advertismentId_example,
  } satisfies GetAppSpecautocontextPresentationSpecautogetoneGetcollectionbyfiltersRequest;

  try {
    const data = await api.getAppSpecautocontextPresentationSpecautogetoneGetcollectionbyfilters(body);
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
| **advertismentId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**GetAppSpecautocontextPresentationSpecautogetcollectionGetcollectionbyfilters200ResponseInner**](GetAppSpecautocontextPresentationSpecautogetcollectionGetcollectionbyfilters200ResponseInner.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | advertisments |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## postAppSpecautocontextPresentationSpecautocreateCreate

> postAppSpecautocontextPresentationSpecautocreateCreate(postAppSpecautocontextPresentationSpecautocreateCreateRequest)



### Example

```ts
import {
  Configuration,
  SpecAutoApi,
} from '';
import type { PostAppSpecautocontextPresentationSpecautocreateCreateOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SpecAutoApi(config);

  const body = {
    // PostAppSpecautocontextPresentationSpecautocreateCreateRequest | Simple auto to be created
    postAppSpecautocontextPresentationSpecautocreateCreateRequest: ...,
  } satisfies PostAppSpecautocontextPresentationSpecautocreateCreateOperationRequest;

  try {
    const data = await api.postAppSpecautocontextPresentationSpecautocreateCreate(body);
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
| **postAppSpecautocontextPresentationSpecautocreateCreateRequest** | [PostAppSpecautocontextPresentationSpecautocreateCreateRequest](PostAppSpecautocontextPresentationSpecautocreateCreateRequest.md) | Simple auto to be created | |

### Return type

`void` (Empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Advertisment created |  -  |
| **400** | Invalid input |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

