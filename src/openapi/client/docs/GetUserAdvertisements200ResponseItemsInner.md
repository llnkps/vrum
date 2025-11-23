
# GetUserAdvertisements200ResponseItemsInner


## Properties

Name | Type
------------ | -------------
`id` | number
`description` | string
`brand` | string
`model` | string
`price` | string
`currency` | string
`releaseYear` | number
`region` | string
`isVerified` | boolean
`createdAt` | Date
`updatedAt` | Date
`images` | Array&lt;string&gt;

## Example

```typescript
import type { GetUserAdvertisements200ResponseItemsInner } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 1,
  "description": Well maintained car,
  "brand": Toyota,
  "model": Corolla,
  "price": 20000,
  "currency": usd,
  "releaseYear": 2020,
  "region": Chisinau,
  "isVerified": false,
  "createdAt": 2023-10-12T10:00Z,
  "updatedAt": 2023-10-12T10:00Z,
  "images": null,
} satisfies GetUserAdvertisements200ResponseItemsInner

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GetUserAdvertisements200ResponseItemsInner
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


