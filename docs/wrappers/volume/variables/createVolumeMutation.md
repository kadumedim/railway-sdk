[**railway-sdk**](../../../README.md)

***

[railway-sdk](../../../README.md) / [wrappers/volume](../README.md) / createVolumeMutation

# Variable: createVolumeMutation

> `const` **createVolumeMutation**: "\n    mutation createVolume (\n        $projectId: String!,\n        $mountPath: String!,\n        $serviceId: String,\n        $environmentId: String,\n    ) \n    \{\n        volumeCreate(\n            input: \{mountPath: $mountPath, projectId: $projectId, serviceId: $serviceId, environmentId: $environmentId\}\n        )\n        \{\n            id\n            name\n            createdAt\n            volumeInstances \{\n                edges \{\n                    node \{\n                        currentSizeMB\n                        createdAt\n                        sizeMB\n                        serviceId\n                        region\n                        id\n                        mountPath\n                        externalId\n                        environmentId\n                        state\n                        type\n                    \}\n                \}\n            \}\n        \}\n    \}\n"

Defined in: [wrappers/volume/createVolume.ts:1](https://github.com/kadumedim/sdk/blob/d9e2a4df04524ab5dba6afa11a8d3d1d683a52ff/src/wrappers/volume/createVolume.ts#L1)
