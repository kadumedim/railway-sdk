[**railway-sdk**](../../../README.md)

***

[railway-sdk](../../../README.md) / [wrappers/project](../README.md) / getProjectQuery

# Variable: getProjectQuery

> `const` **getProjectQuery**: "\n    query getProject($projectId: String!) \{\n        project(id: $projectId) \{\n            createdAt\n            deletedAt\n            description\n            expiredAt\n            id\n            isPublic\n            isTempProject\n            name\n            updatedAt\n            services \{\n            edges \{\n                node \{\n                createdAt\n                deletedAt\n                projectId\n                id\n                name\n                icon\n                featureFlags\n                updatedAt\n                \}\n            \}\n            \}\n        \}\n    \}\n"

Defined in: [wrappers/project/getProject.ts:1](https://github.com/kadumedim/sdk/blob/cc2c31c4f88817d8217cd214e265961cbc4ebcac/src/wrappers/project/getProject.ts#L1)
