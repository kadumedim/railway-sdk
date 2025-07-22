import { RailwaySDK } from "./sdk.ts";

async function main() {
  try {
    const sdk = new RailwaySDK({
      /* accessToken: process.env.RAILWAY_PERSONAL_TOKEN, */
      accessToken: process.env.RAILWAY_TEAM_TOKEN,
    });
    console.log("sdk:", sdk);
   /*  const me = await sdk.getMe(); */

    const projects = await sdk.getProjects();

    /* console.log("me:", me); */
    console.log("projects:", projects);
   /*  const services = await sdk.getServices("b145aa0b-6c5d-4bf4-ab70-9adcedbf321d", "team");
    console.log("services:", services); */
  } catch (err) {
    console.error("Error fetching:", err);
  }
}

main();
