import { RailwaySDK } from "./sdk.ts";

async function main() {
  try {
    const sdk = new RailwaySDK({
      accessToken: process.env.RAILWAY_PERSONAL_TOKEN,
      /*  accessToken: Bun.env.RAILWAY_TEAM_TOKEN, */
    });
    /* const me = await sdk.getMe();

    console.log("me:", me); */

    const services = await sdk.getServices(
      "0b749b35-37ab-4976-8139-97e18071b6cc",
    );

    console.log("services:", services);
  } catch (err) {
    console.error("Error fetching:", err);
  }
}

main();
