import { GraphQLClient } from "graphql-request";

const personalToken = Bun.env.RAILWAY_PERSONAL_TOKEN;
const teamToken = Bun.env.RAILWAY_TEAM_TOKEN;

class APIClient {
  private client: GraphQLClient;

  constructor(endpoint: string, token: string) {
    this.client = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async request<T>(query: string, variables?: Record<string, any>): Promise<T> {
    return this.client.request<T>(query, variables);
  }
}

export { personalToken, teamToken };
export default APIClient;
