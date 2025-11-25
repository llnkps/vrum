# UserSubscriptionFilterApi

All URIs are relative to *http://192.168.100.8:8000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createUserSubscriptionFilter**](UserSubscriptionFilterApi.md#createusersubscriptionfilteroperation) | **POST** /api/users/subscription-filters |  |
| [**getUserSubscriptionFilter**](UserSubscriptionFilterApi.md#getusersubscriptionfilter) | **GET** /api/users/subscription-filters/{subscriptionFilterId} |  |
| [**getUserSubscriptionFilters**](UserSubscriptionFilterApi.md#getusersubscriptionfilters) | **GET** /api/users/subscription-filters |  |



## createUserSubscriptionFilter

> createUserSubscriptionFilter(createUserSubscriptionFilterRequest)



### Example

```ts
import {
  Configuration,
  UserSubscriptionFilterApi,
} from '';
import type { CreateUserSubscriptionFilterOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserSubscriptionFilterApi(config);

  const body = {
    // CreateUserSubscriptionFilterRequest | Create user subscription filter
    createUserSubscriptionFilterRequest: ...,
  } satisfies CreateUserSubscriptionFilterOperationRequest;

  try {
    const data = await api.createUserSubscriptionFilter(body);
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
| **createUserSubscriptionFilterRequest** | [CreateUserSubscriptionFilterRequest](CreateUserSubscriptionFilterRequest.md) | Create user subscription filter | |

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
| **201** | User subscription filter created |  -  |
| **400** | Invalid input |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getUserSubscriptionFilter

> GetUserSubscriptionFilter200Response getUserSubscriptionFilter(subscriptionFilterId)



### Example

```ts
import {
  Configuration,
  UserSubscriptionFilterApi,
} from '';
import type { GetUserSubscriptionFilterRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserSubscriptionFilterApi(config);

  const body = {
    // string
    subscriptionFilterId: subscriptionFilterId_example,
  } satisfies GetUserSubscriptionFilterRequest;

  try {
    const data = await api.getUserSubscriptionFilter(body);
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
| **subscriptionFilterId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**GetUserSubscriptionFilter200Response**](GetUserSubscriptionFilter200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | User subscription filter retrieved |  -  |
| **404** | Subscription filter not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getUserSubscriptionFilters

> Array&lt;UserSubscriptionFilter&gt; getUserSubscriptionFilters()



### Example

```ts
import {
  Configuration,
  UserSubscriptionFilterApi,
} from '';
import type { GetUserSubscriptionFiltersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserSubscriptionFilterApi(config);

  try {
    const data = await api.getUserSubscriptionFilters();
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

[**Array&lt;UserSubscriptionFilter&gt;**](UserSubscriptionFilter.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | User subscription filters retrieved |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

