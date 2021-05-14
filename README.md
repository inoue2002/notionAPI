# notionAPI
notionAPIをいじいじする


.envにトークを入れる
`$ npm install` する 
`$ node index.js` で起動する

起動する時は引数に利用したいコマンド名を入力する必要がある

現在対応しているコマンド
## 参加しているメンバーの情報をすべて取得
`$ node index.js users `
## テーブルにデータを追加
`$  node index.js create_page {{table_Id}} {{追加する内容(テキスト)}}`
## テーブルの値をすべて取得する
`$ node index.js query {{table_Id}}`

