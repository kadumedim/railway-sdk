[**railway-sdk**](../../../README.md)

***

[railway-sdk](../../../README.md) / [wrappers/service](../README.md) / createServiceMutation

# Variable: createServiceMutation

> `const` **createServiceMutation**: "\n  mutation createService(\n    $projectId: String!,\n    $name: String,\n    $icon: String,\n    $environmentId: String,\n    $branch: String,\n    $image: String,\n    $repo: String,\n    ) \n        \{\n            serviceCreate(\n                input:\{ \n                    projectId: $projectId, \n                    name: $name, \n                    icon: $icon, \n                    environmentId: $environmentId, \n                    branch: $branch,\n                    source : \{\n                        image: $image,\n                        repo: $repo,\n                    \}\n                \}\n            )\n            \{\n                createdAt\n                featureFlags\n                icon\n                id\n                name\n                projectId\n            \}\n        \}\n"

Defined in: [wrappers/service/createService.ts:1](https://github.com/kadumedim/sdk/blob/cc2c31c4f88817d8217cd214e265961cbc4ebcac/src/wrappers/service/createService.ts#L1)
