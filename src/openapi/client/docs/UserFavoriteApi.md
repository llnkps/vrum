# UserFavoriteApi

All URIs are relative to *http://192.168.100.8:8000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**addUserFavorite**](UserFavoriteApi.md#adduserfavoriteoperation) | **POST** /api/users/favorites |  |
| [**deleteUserFavorite**](UserFavoriteApi.md#deleteuserfavorite) | **DELETE** /api/users/favorites/{id} | Delete a user favorite |
| [**getUserFavorites**](UserFavoriteApi.md#getuserfavorites) | **GET** /api/users/favorites | Get user favorites collection with pagination |



## addUserFavorite

> AddUserFavorite201Response addUserFavorite(addUserFavoriteRequest)



### Example

```ts
import {
  Configuration,
  UserFavoriteApi,
} from '';
import type { AddUserFavoriteOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserFavoriteApi(config);

  const body = {
    // AddUserFavoriteRequest
    addUserFavoriteRequest: ...,
  } satisfies AddUserFavoriteOperationRequest;

  try {
    const data = await api.addUserFavorite(body);
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
| **addUserFavoriteRequest** | [AddUserFavoriteRequest](AddUserFavoriteRequest.md) |  | |

### Return type

[**AddUserFavorite201Response**](AddUserFavorite201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Favorite added successfully |  -  |
| **400** | Bad request |  -  |
| **404** | Advertisement not found |  -  |
| **409** | Favorite already exists |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteUserFavorite

> AddUserFavorite201Response deleteUserFavorite(id)

Delete a user favorite

Delete a specific favorite by ID. Only the owner can delete their favorites.

### Example

```ts
import {
  Configuration,
  UserFavoriteApi,
} from '';
import type { DeleteUserFavoriteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserFavoriteApi(config);

  const body = {
    // number | ID of the favorite to delete
    id: 56,
  } satisfies DeleteUserFavoriteRequest;

  try {
    const data = await api.deleteUserFavorite(body);
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
| **id** | `number` | ID of the favorite to delete | [Defaults to `undefined`] |

### Return type

[**AddUserFavorite201Response**](AddUserFavorite201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Favorite deleted successfully |  -  |
| **404** | Favorite not found |  -  |
| **403** | Forbidden - not the owner |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getUserFavorites

> GetUserFavorites200Response getUserFavorites(page, limit)

Get user favorites collection with pagination

Get user favorites collection with pagination

### Example

```ts
import {
  Configuration,
  UserFavoriteApi,
} from '';
import type { GetUserFavoritesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserFavoriteApi(config);

  const body = {
    // number (optional)
    page: 1,
    // number (optional)
    limit: 25,
  } satisfies GetUserFavoritesRequest;

  try {
    const data = await api.getUserFavorites(body);
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

[**GetUserFavorites200Response**](GetUserFavorites200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Returns paginated user favorites |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

