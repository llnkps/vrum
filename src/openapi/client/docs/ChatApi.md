# ChatApi

All URIs are relative to *http://192.168.100.8:8000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getChatSubscriptionInfo**](ChatApi.md#getchatsubscriptioninfo) | **GET** /api/chat/{chatId}/subscribe | Get Mercure subscription information for a chat |
| [**getChats**](ChatApi.md#getchats) | **GET** /api/chat/chats | Get all chats for the authenticated user |
| [**getMessages**](ChatApi.md#getmessages) | **GET** /api/chat/{chatId}/messages | Get messages for a specific chat |
| [**sendMessage**](ChatApi.md#sendmessageoperation) | **POST** /api/chat/{chatId}/send | Send a message in a chat |
| [**startChat**](ChatApi.md#startchat) | **POST** /api/chat/start/{userId} | Start a chat with another user |



## getChatSubscriptionInfo

> GetChatSubscriptionInfo200Response getChatSubscriptionInfo(chatId)

Get Mercure subscription information for a chat

### Example

```ts
import {
  Configuration,
  ChatApi,
} from '';
import type { GetChatSubscriptionInfoRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ChatApi(config);

  const body = {
    // number
    chatId: 56,
  } satisfies GetChatSubscriptionInfoRequest;

  try {
    const data = await api.getChatSubscriptionInfo(body);
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
| **chatId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**GetChatSubscriptionInfo200Response**](GetChatSubscriptionInfo200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Subscription information |  -  |
| **404** | Chat not found or access denied |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getChats

> Array&lt;GetChats200ResponseInner&gt; getChats()

Get all chats for the authenticated user

### Example

```ts
import {
  Configuration,
  ChatApi,
} from '';
import type { GetChatsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ChatApi(config);

  try {
    const data = await api.getChats();
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

[**Array&lt;GetChats200ResponseInner&gt;**](GetChats200ResponseInner.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of user\&#39;s chats |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getMessages

> Array&lt;MessageDTO&gt; getMessages(chatId)

Get messages for a specific chat

### Example

```ts
import {
  Configuration,
  ChatApi,
} from '';
import type { GetMessagesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ChatApi(config);

  const body = {
    // number
    chatId: 56,
  } satisfies GetMessagesRequest;

  try {
    const data = await api.getMessages(body);
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
| **chatId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;MessageDTO&gt;**](MessageDTO.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Messages retrieved |  -  |
| **404** | Chat not found or access denied |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## sendMessage

> MessageDTO sendMessage(chatId, sendMessageRequest)

Send a message in a chat

Sends a message in the specified chat. The message will be published to Mercure for real-time updates.

### Example

```ts
import {
  Configuration,
  ChatApi,
} from '';
import type { SendMessageOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ChatApi(config);

  const body = {
    // number
    chatId: 56,
    // SendMessageRequest
    sendMessageRequest: ...,
  } satisfies SendMessageOperationRequest;

  try {
    const data = await api.sendMessage(body);
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
| **chatId** | `number` |  | [Defaults to `undefined`] |
| **sendMessageRequest** | [SendMessageRequest](SendMessageRequest.md) |  | |

### Return type

[**MessageDTO**](MessageDTO.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Message sent successfully |  -  |
| **400** | Bad request |  -  |
| **404** | Chat not found or access denied |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## startChat

> startChat(userId)

Start a chat with another user

### Example

```ts
import {
  Configuration,
  ChatApi,
} from '';
import type { StartChatRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ChatApi(config);

  const body = {
    // number
    userId: 56,
  } satisfies StartChatRequest;

  try {
    const data = await api.startChat(body);
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
| **userId** | `number` |  | [Defaults to `undefined`] |

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
| **201** | Chat created |  -  |
| **400** | Bad request |  -  |
| **404** | User not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

