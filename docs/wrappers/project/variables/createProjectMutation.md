[**railway-sdk**](../../../README.md)

***

[railway-sdk](../../../README.md) / [wrappers/project](../README.md) / createProjectMutation

# Variable: createProjectMutation

> `const` **createProjectMutation**: "\n  mutation createProject(\n    $teamId: String!,\n    $name: String,\n    $isPublic: Boolean,\n    $defaultEnvironmentName: String,\n    $description: String\n    ) \n        \{\n            projectCreate(\n                input:\{ \n                    name: $name, \n                    teamId: $teamId, \n                    isPublic: $isPublic, \n                    defaultEnvironmentName: $defaultEnvironmentName, \n                    description: $description \n                \}\n            )\n            \{\n                id\n                baseEnvironmentId\n                baseEnvironment \{\n                    id\n                    createdAt\n                    name\n                    updatedAt\n                    meta \{\n                        baseBranch\n                        branch\n                        prCommentId\n                        prNumber\n                        prRepo\n                        prTitle\n                    \}\n                \}\n                subscriptionType\n                subscriptionPlanLimit\n                teamId\n                name\n                members \{\n                name\n                id\n                email\n                avatar\n                role\n                \}\n                isPublic\n                isTempProject\n                expiredAt\n                createdAt\n            \}\n        \}\n"

Defined in: [wrappers/project/createProject.ts:1](https://github.com/kadumedim/sdk/blob/cc2c31c4f88817d8217cd214e265961cbc4ebcac/src/wrappers/project/createProject.ts#L1)
