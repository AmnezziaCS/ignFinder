import * as fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const usernames = fs
  .readFileSync("./dictionaries/usernames.txt", "utf8")
  .split("\n");
const usernamesChecked = fs
  .readFileSync("./dictionaries/usernames-checked.txt", "utf8")
  .split("\n");

const usernamesToCheck = usernames.filter(
  (username) => !usernamesChecked.includes(username)
);

const rootUrl = process.env.ROOT_URL;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const checkUsername = async (username: string) => {
  const url = `${rootUrl}${username}`;
  try {
    const response = await fetch(url);
    if (response.status === 404) {
      fs.appendFileSync(
        "./dictionaries/usernames-claimable.txt",
        `${username}\n`
      );
      console.log(`💵 The username ${username} is not taken`);
    }
  } catch (error) {
    console.error(error);
  }

  fs.appendFileSync("./dictionaries/usernames-checked.txt", `${username}\n`);
};

const main = async () => {
  console.log("⚙️ Starting the batch of checks\n");
  for (const username of usernamesToCheck) {
    console.log(`🔍 Checking the username ${username}`);
    await checkUsername(username);
    await sleep(2000);
  }
  console.log("🏁 All usernames have been checked");
};

main();
