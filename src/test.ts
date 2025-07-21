import { RailwaySDK } from "./sdk.ts";

async function main() {
  try {
    const sdk = new RailwaySDK({
      endpoint: "https://api.yourservice.com/graphql",
      accountToken: process.env.ACCOUNT_TOKEN,
      teamToken: process.env.TEAM_TOKEN,
    });

    const me = await sdk.getMe();
    console.log("Me:", me);
  } catch (err) {
    console.error("Error fetching 'me':", err);
  }
}

main();
