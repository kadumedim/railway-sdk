import { GraphQLClient } from "graphql-request";
import type { GetMeQuery } from "./generated/graphql";
import { getMeQuery } from "./operations/queries/getMe";

interface SDKConfig {
  endpoint?: string;
  accountToken?: string;
  teamToken?: string;
}

export class RailwaySDK {
  private client: GraphQLClient;
  private config: SDKConfig;

  constructor(config: SDKConfig) {
    this.config = config;

    this.client = new GraphQLClient(config.endpoint || "https://backboard.railway.com/graphql/v2", {
      headers: this.getHeaders("account"),
    });
  }

  private getHeaders(type: "account" | "team") {
    const token =
      type === "account" ? this.config.accountToken : this.config.teamToken;

    if (!token) throw new Error(`${type} token is required`);
    return { Authorization: `Bearer ${token}` };
  }

  async getMe() {
    return this.client.request<GetMeQuery>(getMeQuery);
  }
}
