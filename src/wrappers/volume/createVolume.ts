export const createVolumeMutation = /* GraphQL */ `
    mutation createVolume (
        $projectId: String!,
        $mountPath: String!,
        $serviceId: String,
        $environmentId: String,
    ) 
    {
        volumeCreate(
            input: {mountPath: $mountPath, projectId: $projectId, serviceId: $serviceId, environmentId: $environmentId}
        )
        {
            id
            name
            createdAt
            volumeInstances {
                edges {
                    node {
                        currentSizeMB
                        createdAt
                        sizeMB
                        serviceId
                        region
                        id
                        mountPath
                        externalId
                        environmentId
                        state
                        type
                    }
                }
            }
        }
    }
`;
