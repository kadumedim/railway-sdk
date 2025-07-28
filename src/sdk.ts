import { GraphQLClient } from "graphql-request";
import type {
  GetMeQuery,
  GetProjectQuery,
  GetProjectsQuery,
  CreateApiTokenMutation
} from "./generated/graphql";
import { getMeQuery } from "./operations/queries/getMe";
import { getProjectsQuery } from "./operations/queries/getProjects";
import { getServicesQuery } from "./operations/queries/getServices";
import { createApiTokenMutation } from "./operations/mutations/createApiToken";

interface SDKConfig {
  endpoint?: string;
  accessToken?: string;
}

export class RailwaySDK {
  private client: GraphQLClient;
  private config: SDKConfig;

  constructor(config: SDKConfig) {
    this.config = config;

    this.client = new GraphQLClient(
      config.endpoint || "https://backboard.railway.com/graphql/v2",
      {
        headers: { Authorization: `Bearer ${this.config.accessToken}` },
      },
    );
  }

  async getMe() {
    const { me } = await this.client.request<GetMeQuery>(getMeQuery);
    return me;
  }

  async getProjects() {
    const result =
      await this.client.request<GetProjectsQuery>(getProjectsQuery);
    return result.projects?.edges;
  }

  /* Since we don't have a specific query for services, we're using the project query and filtering the results */
  async getServices(projectId: string) {
    const result = await this.client.request<GetProjectQuery>(
      getServicesQuery,
      {
        projectId,
      },
    );
    return result.project?.services?.edges;
  }

  async getServiceLogs() {}

  async createApiToken(name: string) {
    const result = await this.client.request<CreateApiTokenMutation>(
      createApiTokenMutation,
      { name },
    );
    return result.apiTokenCreate;
  }
}
