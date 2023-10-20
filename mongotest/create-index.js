const { MongoClient } = require("mongodb");

const url = "mongodb://root:examplepassword@localhost:27017";
const dbName = "test";

(async function () {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db(dbName);
  const collection = db.collection("users");

  // Create an index on the "chatid" field
  await collection.createIndex({ chatid: 1 }); // 1 for ascending order

  console.log("Index created");

  await client.close();
})();
