require("dotenv").config();
const { Client } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

main();

async function main() {
  //コマンドライン引数に応じて処理を行う
  switch (process.argv[2]) {
    case "users":
        await usersListFunc()
      break;
  }
}

async function usersListFunc() {
  try {
    const listUsersResponse = await notion.users.list();
    console.log(listUsersResponse);
  } catch (error) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      //
      // For example: handle by asking the user to select a different database
      //
    } else {
      // Other error handling code
      console.error(error);
    }
  }
}
