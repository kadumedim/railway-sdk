[**railway-sdk**](../../README.md)

***

[railway-sdk](../../README.md) / [wrapper](../README.md) / GraphQLClient

# Class: GraphQLClient

Defined in: [wrapper.ts:28](https://github.com/kadumedim/sdk/blob/cc2c31c4f88817d8217cd214e265961cbc4ebcac/src/wrapper.ts#L28)

**`Internal`**

Internal GraphQL client for making requests to Railway's API

## Constructors

### Constructor

> **new GraphQLClient**(`endpoint`, `config?`): `GraphQLClient`

Defined in: [wrapper.ts:32](https://github.com/kadumedim/sdk/blob/cc2c31c4f88817d8217cd214e265961cbc4ebcac/src/wrapper.ts#L32)

#### Parameters

##### endpoint

`string`

##### config?

[`SDKConfig`](../interfaces/SDKConfig.md)

#### Returns

`GraphQLClient`

## Methods

### request()

> **request**\<`T`\>(`query`, `variables?`): `Promise`\<`T`\>

Defined in: [wrapper.ts:46](https://github.com/kadumedim/sdk/blob/cc2c31c4f88817d8217cd214e265961cbc4ebcac/src/wrapper.ts#L46)

Makes a GraphQL request to the configured endpoint

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### query

`string`

The GraphQL query string

##### variables?

`Record`\<`string`, `unknown`\>

Optional variables for the GraphQL query

#### Returns

`Promise`\<`T`\>

Promise resolving to the query result data
