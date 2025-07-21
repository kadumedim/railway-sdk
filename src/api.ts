import { apiClient, personalToken } from "./client";
import type { GetMeQuery } from "./generated/graphql";
import { getMeQuery } from "./operations/queries/getMe.ts";

export async function getMe(): Promise<GetMeQuery["me"]> {
  const client = apiClient(personalToken);
  const result = await client.request<GetMeQuery>(getMeQuery);
  return result.me;
}
