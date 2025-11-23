
# AdvertisementWithFiltersResponse

Advertisement with filter parameters response

## Properties

Name | Type
------------ | -------------
`filterParameters` | [Array&lt;AdvertisementFilterParameterResponse&gt;](AdvertisementFilterParameterResponse.md)
`id` | number
`brand` | string
`model` | string
`price` | string
`currency` | string
`releaseYear` | number
`region` | string
`createdAt` | Date
`images` | Array&lt;string&gt;

## Example

```typescript
import type { AdvertisementWithFiltersResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "filterParameters": null,
  "id": 1,
  "brand": Toyota,
  "model": Corolla,
  "price": 20000,
  "currency": usd,
  "releaseYear": 2020,
  "region": Chisinau,
  "createdAt": 2023-10-12T10:00Z,
  "images": null,
} satisfies AdvertisementWithFiltersResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdvertisementWithFiltersResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


