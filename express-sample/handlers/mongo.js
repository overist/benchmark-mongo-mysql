const { MongoClient } = require("mongodb");
const { Worker, isMainThread, parentPort } = require("worker_threads");

module.exports = async function (req, res) {
  const url = "mongodb://root:examplepassword@localhost:27017";
  const dbName = "test";

  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db(dbName);
  const collection = db.collection("users");

  const result = await collection
    .find({ chatid: `chat${Math.floor(Math.random() * 10000)}01` })
    .toArray();

  await client.close();

  console.log("mongo", req.ip, new Date().toISOString());

  res.json({
    data: result,
  });
};
