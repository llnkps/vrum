
# CreateUserSubscriptionFilterRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`sourceType` | string
`b` | { [key: string]: any; }
`r` | { [key: string]: any; }
`filterParameters` | { [key: string]: any; }

## Example

```typescript
import type { CreateUserSubscriptionFilterRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "sourceType": null,
  "b": null,
  "r": null,
  "filterParameters": null,
} satisfies CreateUserSubscriptionFilterRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateUserSubscriptionFilterRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


