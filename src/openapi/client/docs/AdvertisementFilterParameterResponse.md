
# AdvertisementFilterParameterResponse

Advertisement filter parameter response

## Properties

Name | Type
------------ | -------------
`filterName` | string
`filterNameTranslated` | string
`value` | string
`valueTranslated` | string

## Example

```typescript
import type { AdvertisementFilterParameterResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "filterName": fuel_type,
  "filterNameTranslated": Fuel Type,
  "value": diesel,
  "valueTranslated": Diesel,
} satisfies AdvertisementFilterParameterResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdvertisementFilterParameterResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


