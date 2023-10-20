const { MongoClient } = require("mongodb");
const { Worker, isMainThread, parentPort } = require("worker_threads");

const SELECT_COUNT = 100; // 100개 쓰레드를 병렬실행
const THREAD_COUNT = 100; // 한 쓰레드가 100개 select를 병렬실행

const url = "mongodb://root:examplepassword@localhost:27017";
const dbName = "test";

if (isMainThread) {
  for (let i = 0; i < THREAD_COUNT; i++) {
    const worker = new Worker(__filename);
    worker.on("message", (message) => {
      console.log(
        `Execution time from worker ${i + 1}: ${message.executionTime} ms`
      );
    });
  }
} else {
  (async function () {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    const collection = db.collection("users");

    const startTime = Date.now();

    const promises = [];
    for (let i = 0; i < SELECT_COUNT; i++) {
      const promise = collection.find({ chatid: `chat${i + 1}01` }).toArray();
      promises.push(promise);
    }
    await Promise.all(promises);

    const endTime = Date.now();
    const executionTime = endTime - startTime;

    parentPort.postMessage({ executionTime });

    await client.close();
  })();
}
