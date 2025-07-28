export const createApiTokenMutation = /* GraphQL */ `
  mutation createApiToken($name: String!, $teamId: String) {
    apiTokenCreate(input: { name: $name, teamId: $teamId })
  }
`;
