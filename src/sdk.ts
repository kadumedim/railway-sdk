import { GraphQLClient } from "graphql-request";
import type { GetMeQuery, GetProjectsQuery } from "./generated/graphql";
import { getMeQuery } from "./operations/queries/getMe";
import { getProjectsQuery } from "./operations/queries/getProjects";
import { getServicesQuery } from "./operations/queries/getServices";

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
    return this.client.request<GetMeQuery>(getMeQuery);
  }

  async getProjects() {
    return this.client.request<GetProjectsQuery>(getProjectsQuery);
  }

  async getServices(projectId: string) {
    return this.client.request<GetProjectsQuery>(getServicesQuery, {
      projectId,
    });
  }

  async getServiceLogs() {}
}
