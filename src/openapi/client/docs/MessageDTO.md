
# MessageDTO

Chat message data transfer object

## Properties

Name | Type
------------ | -------------
`id` | number
`text` | string
`createdAt` | number
`user` | [MessageUserDTO](MessageUserDTO.md)
`sent` | boolean
`received` | boolean
`image` | string
`system` | boolean
`pending` | boolean

## Example

```typescript
import type { MessageDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "text": null,
  "createdAt": null,
  "user": null,
  "sent": null,
  "received": null,
  "image": null,
  "system": null,
  "pending": null,
} satisfies MessageDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MessageDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


