export const getProjectQuery = /* GraphQL */ `
    query getProject($projectId: String!) {
        project(id: $projectId) {
            createdAt
            deletedAt
            description
            expiredAt
            id
            isPublic
            isTempProject
            name
            updatedAt
            services {
            edges {
                node {
                createdAt
                deletedAt
                projectId
                id
                name
                icon
                featureFlags
                updatedAt
                }
            }
            }
        }
    }
`;
