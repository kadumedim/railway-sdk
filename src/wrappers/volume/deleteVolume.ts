export const deleteVolumeMutation = /* GraphQL */ `
    mutation deleteVolume ($volumeId: String!) {
        volumeDelete(volumeId: $volumeId)
    }
`;
