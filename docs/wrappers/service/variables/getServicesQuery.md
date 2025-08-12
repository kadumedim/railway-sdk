[**railway-sdk**](../../../README.md)

***

[railway-sdk](../../../README.md) / [wrappers/service](../README.md) / getServicesQuery

# Variable: getServicesQuery

> `const` **getServicesQuery**: "\n  query getServices($projectId: String!) \{\n    project(id: $projectId) \{\n      services \{\n        edges \{\n          node \{\n            id\n            createdAt\n            name\n            updatedAt\n            deletedAt\n            icon\n            deployments \{\n              edges \{\n                node \{\n                  id\n                  instances \{\n                    status\n                  \}\n                  createdAt\n                  canRedeploy\n                  canRollback\n                  serviceId\n                  staticUrl\n                  status\n                  url\n                  updatedAt\n                  deploymentStopped\n                \}\n              \}\n            \}\n            projectId\n          \}\n        \}\n      \}\n    \}\n  \}\n"

Defined in: [wrappers/service/getServices.ts:1](https://github.com/kadumedim/sdk/blob/d9e2a4df04524ab5dba6afa11a8d3d1d683a52ff/src/wrappers/service/getServices.ts#L1)
