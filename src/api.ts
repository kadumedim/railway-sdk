import type { GetMeQuery } from "./generated/graphql";
import APIClient, { personalToken } from "./index";
import { getMeQuery } from "./operations/queries/getMe.ts";

const endpoint = "https://backboard.railway.com/graphql/v2";

export async function getMe(): Promise<GetMeQuery["me"]> {
  if (!personalToken)
    throw new Error("RAILWAY_PERSONAL_TOKEN not set in environment!");
  const client = new APIClient(endpoint, personalToken);
  console.log("getMeQuery", getMeQuery);
  const result = await client.request<GetMeQuery>(getMeQuery);
  return result.me;
}
