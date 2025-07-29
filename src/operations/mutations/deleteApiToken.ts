export const deleteApiTokenMutation = /* GraphQL */ `
  mutation deleteApiToken($id: String!) {
    apiTokenDelete(input: { id: $id })
  }
`;
