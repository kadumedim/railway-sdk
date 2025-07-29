export const deleteProjectMutation = /* GraphQL */ `
  mutation deleteProject($id: String!) {
    projectDelete(id: $id)
  }
`;
