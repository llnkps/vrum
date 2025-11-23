
# GetUserFavorites200Response


## Properties

Name | Type
------------ | -------------
`total` | number
`currentPage` | number
`perPage` | number
`items` | [Array&lt;GetUserFavorites200ResponseItemsInner&gt;](GetUserFavorites200ResponseItemsInner.md)

## Example

```typescript
import type { GetUserFavorites200Response } from ''

// TODO: Update the object below with actual values
const example = {
  "total": 100,
  "currentPage": 1,
  "perPage": 25,
  "items": null,
} satisfies GetUserFavorites200Response

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GetUserFavorites200Response
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


