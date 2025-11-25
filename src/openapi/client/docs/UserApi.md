# UserApi

All URIs are relative to *http://192.168.100.8:8000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAppUserdomainPresentationGetmeGetme**](UserApi.md#getappuserdomainpresentationgetmegetme) | **GET** /api/users/me | Get current user info and recent products |
| [**postApiRegisterWithInvite**](UserApi.md#postapiregisterwithinvite) | **POST** /api/register_with_invite/{token} |  |
| [**userActivate**](UserApi.md#useractivate) | **GET** /api/user/activate | Activate user account |
| [**userSignUp**](UserApi.md#usersignup) | **POST** /api/users |  |



## getAppUserdomainPresentationGetmeGetme

> GetAppUserdomainPresentationGetmeGetme200Response getAppUserdomainPresentationGetmeGetme()

Get current user info and recent products

Returns user info and recent products

### Example

```ts
import {
  Configuration,
  UserApi,
} from '';
import type { GetAppUserdomainPresentationGetmeGetmeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserApi(config);

  try {
    const data = await api.getAppUserdomainPresentationGetmeGetme();
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

[**GetAppUserdomainPresentationGetmeGetme200Response**](GetAppUserdomainPresentationGetmeGetme200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Returns user info and recent products |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## postApiRegisterWithInvite

> postApiRegisterWithInvite(token)



### Example

```ts
import {
  Configuration,
  UserApi,
} from '';
import type { PostApiRegisterWithInviteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserApi(config);

  const body = {
    // string
    token: token_example,
  } satisfies PostApiRegisterWithInviteRequest;

  try {
    const data = await api.postApiRegisterWithInvite(body);
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
| **token** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## userActivate

> userActivate(token)

Activate user account

### Example

```ts
import {
  Configuration,
  UserApi,
} from '';
import type { UserActivateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserApi(config);

  const body = {
    // string | Activation token
    token: activation-token,
  } satisfies UserActivateRequest;

  try {
    const data = await api.userActivate(body);
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
| **token** | `string` | Activation token | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Account activated successfully |  -  |
| **400** | Invalid token |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## userSignUp

> userSignUp(userSignUpDTO)



### Example

```ts
import {
  Configuration,
  UserApi,
} from '';
import type { UserSignUpRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserApi(config);

  const body = {
    // UserSignUpDTO
    userSignUpDTO: ...,
  } satisfies UserSignUpRequest;

  try {
    const data = await api.userSignUp(body);
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
| **userSignUpDTO** | [UserSignUpDTO](UserSignUpDTO.md) |  | |

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
| **201** | User registered successfully |  -  |
| **400** | Invalid input or invitation |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

