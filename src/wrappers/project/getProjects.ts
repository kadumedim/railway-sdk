export const getProjectsQuery = /* GraphQL */ `
  query getProjects {
    projects {
      edges {
        node {
          id
          name
          description
          createdAt
          deletedAt
          isPublic
          isTempProject
          updatedAt
          teamId
        }
      }
    }
  }
`;
