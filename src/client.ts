import { GraphQLClient } from "graphql-request";

const personalToken = Bun.env.RAILWAY_PERSONAL_TOKEN;
const teamToken = Bun.env.RAILWAY_TEAM_TOKEN;
const endpoint = "https://backboard.railway.com/graphql/v2";

export class APIClient {
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

export function apiClient(token?: string): APIClient {
  if (!token) {
    throw new Error("RAILWAY_PERSONAL_TOKEN not set in environment!");
  }
  return new APIClient(endpoint, token);
}

export { personalToken, teamToken };
