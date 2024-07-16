import * as fs from "fs";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.ROOT_URL || !parseInt(process.env.MIN_LENGTH)) {
  console.error("Please provide a ROOT_URL and a MIN_LENGTH in your .env file");
  process.exit(1);
}

const usernames = fs
  .readFileSync("./dictionaries/usernames.txt", "utf8")
  .split("\n");
const usernamesChecked = fs
  .readFileSync("./dictionaries/usernames-checked.txt", "utf8")
  .split("\n");

const minLength = parseInt(process.env.MIN_LENGTH);

const rootUrl = process.env.ROOT_URL;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const checkUsername = async (username: string) => {
  const url = `${rootUrl}${username}`;
  try {
    const response = await fetch(url);

    if (response.status === 403) {
      console.log(`⚠️ Rejected by the server, waiting 5 minutes`);
      await sleep(300000);
      return;
    }
    if (response.status === 404) {
      fs.appendFileSync(
        "./dictionaries/usernames-claimable.txt",
        `${username}\n`
      );
      console.log(`💵 Username claimable: ${username}`);
    }
  } catch (error) {
    console.error(error);
  }

  fs.appendFileSync("./dictionaries/usernames-checked.txt", `${username}\n`);
};

const main = async () => {
  console.log("⚙️ Starting the batch of checks\n");
  for (const username of usernames) {
    if (usernamesChecked.includes(username) || minLength >= username.length) {
      continue;
    }
    console.log(`🔍 Checking the username ${username}`);
    await checkUsername(username);
    await sleep(3000);
  }
  console.log("🏁 All usernames have been checked");
};

main();
