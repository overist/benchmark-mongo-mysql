const { MongoClient } = require("mongodb");
const INSERT_DATA_COUNT = 300000000;

const url = "mongodb://root:examplepassword@localhost:27017";
const dbName = "test";

(async function () {
  let client;

  try {
    client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");

    const db = client.db(dbName);
    const collection = db.collection("users");

    const chunkSize = 100;
    // for (let i = 1; i <= 100000000; i += chunkSize) {
    for (let i = 1; i <= INSERT_DATA_COUNT; i += chunkSize) {
      const data = [];
      for (let j = i; j < i + chunkSize; j++) {
        data.push({
          id: j,
          username: `user${j}`,
          chatid: `chat${i}`,
          createdat: new Date(),
        });
      }
      await collection.insertMany(data);
      console.log(`Inserted ${i}-${i + chunkSize - 1}`);
    }
  } catch (err) {
    console.error(err.stack);
  } finally {
    if (client) {
      await client.close();
    }
  }
})();
