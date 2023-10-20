const mysql = require("mysql2/promise");
const { Worker, isMainThread, parentPort } = require("worker_threads");

const SELECT_COUNT = 100; // 100개 쓰레드를 병렬실행
const THREAD_COUNT = 100; // 한 쓰레드가 100개 select를 병렬실행

const config = {
  host: "localhost",
  user: "root",
  password: "examplepassword",
  database: "exampledb",
  port: 3306,
};

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
    const connection = await mysql.createConnection(config);

    const startTime = Date.now();

    const promises = [];
    for (let i = 0; i < SELECT_COUNT; i++) {
      const promise = connection.execute(
        "SELECT * FROM users WHERE chatid = ?",
        [`chat${i + 1}01`]
      );
      promises.push(promise);
    }
    await Promise.all(promises);

    const endTime = Date.now();
    const executionTime = endTime - startTime;

    parentPort.postMessage({ executionTime });

    await connection.end();
  })();
}
