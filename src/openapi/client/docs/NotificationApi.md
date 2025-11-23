# NotificationApi

All URIs are relative to *http://192.168.100.8:8000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getUserNotifications**](NotificationApi.md#getusernotifications) | **GET** /api/notifications | Get user notifications |
| [**sendNotification**](NotificationApi.md#sendnotificationoperation) | **POST** /api/notifications/send | Send a push notification |
| [**testNotification**](NotificationApi.md#testnotificationoperation) | **POST** /api/test-notification | Send a test push notification (for development only) |



## getUserNotifications

> Array&lt;GetUserNotifications200ResponseInner&gt; getUserNotifications(limit)

Get user notifications

### Example

```ts
import {
  Configuration,
  NotificationApi,
} from '';
import type { GetUserNotificationsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new NotificationApi(config);

  const body = {
    // number | Number of notifications to return (optional)
    limit: 56,
  } satisfies GetUserNotificationsRequest;

  try {
    const data = await api.getUserNotifications(body);
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
| **limit** | `number` | Number of notifications to return | [Optional] [Defaults to `50`] |

### Return type

[**Array&lt;GetUserNotifications200ResponseInner&gt;**](GetUserNotifications200ResponseInner.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | User notifications retrieved |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## sendNotification

> sendNotification(sendNotificationRequest)

Send a push notification

### Example

```ts
import {
  Configuration,
  NotificationApi,
} from '';
import type { SendNotificationOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new NotificationApi(config);

  const body = {
    // SendNotificationRequest
    sendNotificationRequest: ...,
  } satisfies SendNotificationOperationRequest;

  try {
    const data = await api.sendNotification(body);
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
| **sendNotificationRequest** | [SendNotificationRequest](SendNotificationRequest.md) |  | |

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
| **200** | Notification sent successfully |  -  |
| **400** | Invalid input |  -  |
| **404** | User not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## testNotification

> testNotification(testNotificationRequest)

Send a test push notification (for development only)

### Example

```ts
import {
  Configuration,
  NotificationApi,
} from '';
import type { TestNotificationOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new NotificationApi(config);

  const body = {
    // TestNotificationRequest
    testNotificationRequest: ...,
  } satisfies TestNotificationOperationRequest;

  try {
    const data = await api.testNotification(body);
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
| **testNotificationRequest** | [TestNotificationRequest](TestNotificationRequest.md) |  | |

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
| **200** | Notification queued successfully |  -  |
| **400** | Invalid input |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

