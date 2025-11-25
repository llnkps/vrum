# LoginApi

All URIs are relative to *http://192.168.100.8:8000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiAuthPost**](LoginApi.md#apiauthpostoperation) | **POST** /api/auth |  |



## apiAuthPost

> ApiAuthPost200Response apiAuthPost(apiAuthPostRequest)



Login into the api.

### Example

```ts
import {
  Configuration,
  LoginApi,
} from '';
import type { ApiAuthPostOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new LoginApi(config);

  const body = {
    // ApiAuthPostRequest | Json body
    apiAuthPostRequest: ...,
  } satisfies ApiAuthPostOperationRequest;

  try {
    const data = await api.apiAuthPost(body);
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
| **apiAuthPostRequest** | [ApiAuthPostRequest](ApiAuthPostRequest.md) | Json body | |

### Return type

[**ApiAuthPost200Response**](ApiAuthPost200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Login successful |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

