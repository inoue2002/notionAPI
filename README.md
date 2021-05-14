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
カレンダーブロックにも使えた
ボードにつかえた
`$ node index.js scan {{table_Id}}`
## テーブルの特定の項目を変更する
`$ node index.js update {{table_Id}} {{page_Id}}`
## dbからプロパティと項目が一致をクエリ
`$ node index.js db_query {{table_Id}} {{property_name}} {{検索したい値(テキスト)}}`
## ページの詳細情報を取得する
`$ node index.js pages_retrieve {{parent_Id}}`
## ページの中のブロックのリストを取得（ページのコンテンツ取得）
`$ node index.js block_children {{parent_Id}}`
## ページに子ブロックを追加する
`$ node index.js append_block_children {{parent_Id}}`
##　ボートからクエリする
``