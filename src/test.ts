import { getMe } from "./api";

async function main() {
  try {
    const me = await getMe();
    console.log("Me:", me);
  } catch (err) {
    console.error("Error fetching 'me':", err);
  }
}

main();
