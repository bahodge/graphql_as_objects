# Summary

This is a proof of concept for my company to shift our API to use objects instead of a restful graphql api.

## How to use

- `yarn dev`

```graphql
{
  organizations {
    id
    name
    zones {
      id
      name
      organization {
        id
        name
      }
    }
  }
}
```
