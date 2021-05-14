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
    case "scan":
      await scanFunc();
      break;
    case "db_query":
      await dbQueryFunc();
      break;
    case "update":
      await update();
    case "pages_retrieve":
      await pagesRetrieve();
      break;
    case "block_children":
      await blockChildrenList();
      break;
    case "append_block_children":
      await appendBlockChildren();
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
async function scanFunc() {
  //条件を指定せず全て取得する
  const request_payload = {
    path: "databases/" + process.argv[3] + "/query",
    method: "POST",
  };
  const current_pages = await notion.request(request_payload);
  console.log(current_pages.results[2].properties.Status.select.name);
}
async function update() {
  const request_payload = {
    path: "pages/" + process.argv[3],
    method: "patch",
    body: {
      parent: { database_id: process.argv[4] },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: "新しいなまえ",
              },
            },
          ],
        },
        "やること！": {
          rich_text: [
            {
              text: {
                content: "やらなければいけない",
              },
            },
          ],
        },
      },
    },
  };
  await notion.request(request_payload);
}
async function pagesRetrieve() {
  const parentPage = await notion.pages.retrieve({
    page_id: process.argv[3],
  });
  console.dir(parentPage.properties.title.title);
}
async function blockChildrenList() {
  const blocks = await notion.blocks.children.list({
    block_id: process.argv[3],
  });
  for (const block of blocks.results) {
    console.dir(block);
    console.dir(block.paragraph);
  }
}
async function appendBlockChildren() {
  const request_payload = {
    path: "blocks/" + process.argv[3] + "/children",
    method: "patch",
    body: {
      children: [
        {
          object: "block",
          type: "to_do",
          to_do: {
            text: [{ type: "text", text: { content: "お風呂あらい" } }],
            checked: false,
            children: [],
          },
        },
      ],
    },
  };
  const result = await notion.request(request_payload);
  console.log(result);
}
async function dbQueryFunc() {
  //条件を指定せず全て取得する
  const request_payload = {
    path: "databases/" + process.argv[3] + "/query",
    method: "POST",
    body: {
      filter: {
        property: process.argv[4],
        text: {
          equals: `${process.argv[5]}`,
        },
      },
    },
  };
  const current_pages = await notion.request(request_payload);
  console.dir(current_pages.results);
}
