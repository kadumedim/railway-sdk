export const getServicesQuery = /* GraphQL */ `
query getServices {
  project(id) {
    services {
      edges {
        node {
          id
          createdAt
          name
          updatedAt
          deletedAt
          icon
          deployments {
            edges {
              node {
                id
                instances {
                  status
                }
                createdAt
                canRedeploy
                canRollback
                serviceId
                staticUrl
                status
                url
                updatedAt
                deploymentStopped
              }
            }
          }
          projectId
        }
      }
    }
  }
}
`;
