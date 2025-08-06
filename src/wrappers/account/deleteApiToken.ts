export const deleteApiTokenMutation = /* GraphQL */ `
  mutation deleteApiToken($id: String!) {
    apiTokenDelete(id: $id)
  }
`;
