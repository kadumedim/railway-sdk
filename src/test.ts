import { RailwaySDK } from "./sdk.ts";

async function main() {
  try {
    const sdk = new RailwaySDK({
      accessToken: process.env.RAILWAY_PERSONAL_TOKEN,
      /*  accessToken: Bun.env.RAILWAY_TEAM_TOKEN, */
    });

    const token = await sdk.createApiToken("test");
    console.log("token:", token);
    /* const projects = await sdk.getProjects();

    console.log("projects:", projects); */
  } catch (err) {
    console.error("Error fetching:", err);
  }
}

main();
