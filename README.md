# Summary

This is a proof of concept for my company to shift our API to use objects instead of a restful graphql api.

## How to use

- `yarn dev`
- open the playground
- you can use this query to get started

```graphql
{
  zone(input: { id: "zone0id" }) {
    id
    name
    organization {
      id
      name
    }
  }
  organization(input: { id: "org0id" }) {
    id
    name
    zones {
      id
    }
  }
}
```
