
# PostAppSpecautocontextPresentationSpecautocreateCreateRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`description` | string
`price` | string
`currency` | string
`region` | string
`releaseYear` | number
`parameters` | Array&lt;object&gt;

## Example

```typescript
import type { PostAppSpecautocontextPresentationSpecautocreateCreateRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "name": New Product,
  "description": description,
  "price": 19.99,
  "currency": usd,
  "region": Chisinau,
  "releaseYear": 2025,
  "parameters": null,
} satisfies PostAppSpecautocontextPresentationSpecautocreateCreateRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PostAppSpecautocontextPresentationSpecautocreateCreateRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


