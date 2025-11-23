# MotorbikeApi

All URIs are relative to *http://192.168.100.8:8000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAppMotorbikecontextPresentationBrandgetcollectionGetbrands**](MotorbikeApi.md#getappmotorbikecontextpresentationbrandgetcollectiongetbrands) | **GET** /api/motorbike/brands |  |
| [**getAppMotorbikecontextPresentationModelgetcollectionGetcollectionbyfilters**](MotorbikeApi.md#getappmotorbikecontextpresentationmodelgetcollectiongetcollectionbyfilters) | **GET** /api/motorbike/brands/{brandId}/models |  |
| [**getAppMotorbikecontextPresentationMotorbikegetcollectionGetcollectionbyfilters**](MotorbikeApi.md#getappmotorbikecontextpresentationmotorbikegetcollectiongetcollectionbyfilters) | **GET** /api/motorbike/advertisments |  |
| [**getAppMotorbikecontextPresentationMotorbikegetoneGetcollectionbyfilters**](MotorbikeApi.md#getappmotorbikecontextpresentationmotorbikegetonegetcollectionbyfilters) | **GET** /api/motorbike/advertisments/{advertismentId} |  |
| [**postAppMotorbikecontextPresentationMotorbikecreateCreate**](MotorbikeApi.md#postappmotorbikecontextpresentationmotorbikecreatecreate) | **POST** /api/motorbike/advertisments |  |



## getAppMotorbikecontextPresentationBrandgetcollectionGetbrands

> Array&lt;GetAppSpecautocontextPresentationBrandgetcollectionGetbrands200ResponseInner&gt; getAppMotorbikecontextPresentationBrandgetcollectionGetbrands()



### Example

```ts
import {
  Configuration,
  MotorbikeApi,
} from '';
import type { GetAppMotorbikecontextPresentationBrandgetcollectionGetbrandsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MotorbikeApi(config);

  try {
    const data = await api.getAppMotorbikecontextPresentationBrandgetcollectionGetbrands();
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


## getAppMotorbikecontextPresentationModelgetcollectionGetcollectionbyfilters

> Array&lt;GetAppSpecautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner&gt; getAppMotorbikecontextPresentationModelgetcollectionGetcollectionbyfilters(brandId)



### Example

```ts
import {
  Configuration,
  MotorbikeApi,
} from '';
import type { GetAppMotorbikecontextPresentationModelgetcollectionGetcollectionbyfiltersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MotorbikeApi(config);

  const body = {
    // string
    brandId: brandId_example,
  } satisfies GetAppMotorbikecontextPresentationModelgetcollectionGetcollectionbyfiltersRequest;

  try {
    const data = await api.getAppMotorbikecontextPresentationModelgetcollectionGetcollectionbyfilters(body);
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


## getAppMotorbikecontextPresentationMotorbikegetcollectionGetcollectionbyfilters

> Array&lt;GetAppSpecautocontextPresentationSpecautogetcollectionGetcollectionbyfilters200ResponseInner&gt; getAppMotorbikecontextPresentationMotorbikegetcollectionGetcollectionbyfilters(brand, model, releaseYear, price, additionalFilters)



### Example

```ts
import {
  Configuration,
  MotorbikeApi,
} from '';
import type { GetAppMotorbikecontextPresentationMotorbikegetcollectionGetcollectionbyfiltersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MotorbikeApi(config);

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
  } satisfies GetAppMotorbikecontextPresentationMotorbikegetcollectionGetcollectionbyfiltersRequest;

  try {
    const data = await api.getAppMotorbikecontextPresentationMotorbikegetcollectionGetcollectionbyfilters(body);
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


## getAppMotorbikecontextPresentationMotorbikegetoneGetcollectionbyfilters

> GetAppSpecautocontextPresentationSpecautogetcollectionGetcollectionbyfilters200ResponseInner getAppMotorbikecontextPresentationMotorbikegetoneGetcollectionbyfilters(advertismentId)



### Example

```ts
import {
  Configuration,
  MotorbikeApi,
} from '';
import type { GetAppMotorbikecontextPresentationMotorbikegetoneGetcollectionbyfiltersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MotorbikeApi(config);

  const body = {
    // string
    advertismentId: advertismentId_example,
  } satisfies GetAppMotorbikecontextPresentationMotorbikegetoneGetcollectionbyfiltersRequest;

  try {
    const data = await api.getAppMotorbikecontextPresentationMotorbikegetoneGetcollectionbyfilters(body);
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


## postAppMotorbikecontextPresentationMotorbikecreateCreate

> postAppMotorbikecontextPresentationMotorbikecreateCreate(postAppSpecautocontextPresentationSpecautocreateCreateRequest)



### Example

```ts
import {
  Configuration,
  MotorbikeApi,
} from '';
import type { PostAppMotorbikecontextPresentationMotorbikecreateCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MotorbikeApi(config);

  const body = {
    // PostAppSpecautocontextPresentationSpecautocreateCreateRequest | Simple auto to be created
    postAppSpecautocontextPresentationSpecautocreateCreateRequest: ...,
  } satisfies PostAppMotorbikecontextPresentationMotorbikecreateCreateRequest;

  try {
    const data = await api.postAppMotorbikecontextPresentationMotorbikecreateCreate(body);
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

