# PushTokenApi

All URIs are relative to *http://192.168.100.8:8000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**bindPushTokensToUser**](PushTokenApi.md#bindpushtokenstouseroperation) | **POST** /api/push-tokens/bind | Bind anonymous push tokens to authenticated user |
| [**registerPushToken**](PushTokenApi.md#registerpushtokenoperation) | **POST** /api/push-tokens | Register or update a push token for notifications |



## bindPushTokensToUser

> bindPushTokensToUser(bindPushTokensToUserRequest)

Bind anonymous push tokens to authenticated user

### Example

```ts
import {
  Configuration,
  PushTokenApi,
} from '';
import type { BindPushTokensToUserOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PushTokenApi(config);

  const body = {
    // BindPushTokensToUserRequest
    bindPushTokensToUserRequest: ...,
  } satisfies BindPushTokensToUserOperationRequest;

  try {
    const data = await api.bindPushTokensToUser(body);
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
| **bindPushTokensToUserRequest** | [BindPushTokensToUserRequest](BindPushTokensToUserRequest.md) |  | |

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
| **200** | Push tokens bound successfully |  -  |
| **400** | Invalid request data |  -  |
| **401** | Authentication required |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## registerPushToken

> registerPushToken(registerPushTokenRequest)

Register or update a push token for notifications

### Example

```ts
import {
  Configuration,
  PushTokenApi,
} from '';
import type { RegisterPushTokenOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PushTokenApi(config);

  const body = {
    // RegisterPushTokenRequest
    registerPushTokenRequest: ...,
  } satisfies RegisterPushTokenOperationRequest;

  try {
    const data = await api.registerPushToken(body);
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
| **registerPushTokenRequest** | [RegisterPushTokenRequest](RegisterPushTokenRequest.md) |  | |

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
| **201** | Push token registered successfully |  -  |
| **200** | Push token updated successfully |  -  |
| **400** | Invalid input |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

