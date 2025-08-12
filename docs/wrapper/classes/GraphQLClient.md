[**railway-sdk**](../../README.md)

***

[railway-sdk](../../README.md) / [wrapper](../README.md) / GraphQLClient

# Class: GraphQLClient

Defined in: [wrapper.ts:24](https://github.com/kadumedim/sdk/blob/d9e2a4df04524ab5dba6afa11a8d3d1d683a52ff/src/wrapper.ts#L24)

## Constructors

### Constructor

> **new GraphQLClient**(`endpoint`, `config?`): `GraphQLClient`

Defined in: [wrapper.ts:28](https://github.com/kadumedim/sdk/blob/d9e2a4df04524ab5dba6afa11a8d3d1d683a52ff/src/wrapper.ts#L28)

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

Defined in: [wrapper.ts:42](https://github.com/kadumedim/sdk/blob/d9e2a4df04524ab5dba6afa11a8d3d1d683a52ff/src/wrapper.ts#L42)

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
