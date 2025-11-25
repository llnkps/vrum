
# RegisterPushTokenRequest


## Properties

Name | Type
------------ | -------------
`expoPushToken` | string
`platform` | string
`deviceId` | string
`deviceName` | string

## Example

```typescript
import type { RegisterPushTokenRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "expoPushToken": null,
  "platform": null,
  "deviceId": null,
  "deviceName": null,
} satisfies RegisterPushTokenRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RegisterPushTokenRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


