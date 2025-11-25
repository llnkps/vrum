# UserAdvertisementApi

All URIs are relative to *http://192.168.100.8:8000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getUserAdvertisements**](UserAdvertisementApi.md#getuseradvertisements) | **GET** /api/users/advertisements | Get user advertisements collection with pagination |



## getUserAdvertisements

> GetUserAdvertisements200Response getUserAdvertisements(page, limit)

Get user advertisements collection with pagination

Get user advertisements collection with pagination

### Example

```ts
import {
  Configuration,
  UserAdvertisementApi,
} from '';
import type { GetUserAdvertisementsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserAdvertisementApi(config);

  const body = {
    // number (optional)
    page: 1,
    // number (optional)
    limit: 25,
  } satisfies GetUserAdvertisementsRequest;

  try {
    const data = await api.getUserAdvertisements(body);
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
| **page** | `number` |  | [Optional] [Defaults to `1`] |
| **limit** | `number` |  | [Optional] [Defaults to `10`] |

### Return type

[**GetUserAdvertisements200Response**](GetUserAdvertisements200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Returns paginated user advertisements |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

