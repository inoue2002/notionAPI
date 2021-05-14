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
      await usersListFunc();
      break;
    case "create_page":
      await createPageFunc();
      break;
    case "query":
      await queryFunc();
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
async function createPageFunc() {
  await notion.request({
    path: "pages",
    method: "POST",
    body: {
      parent: { database_id: process.argv[3] },
      properties: {
        Name: [
          {
            text: {
              content: `${process.argv[4]}`,
            },
          },
        ],
      },
    },
  });
}
async function queryFunc() {
  //条件を指定せず全て取得する
  const request_payload = {
    path: "databases/" + process.argv[3] + "/query",
    method: "POST",
  };
  const current_pages = await notion.request(request_payload);
  console.log(current_pages.results);
}
