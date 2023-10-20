const mysql = require("mysql2/promise");
const { Worker, isMainThread, parentPort } = require("worker_threads");

module.exports = async function (req, res) {
  const config = {
    host: "localhost",
    user: "root",
    password: "examplepassword",
    database: "exampledb",
    port: 3306,
  };

  const connection = await mysql.createConnection(config);

  const result = await connection.execute(
    "SELECT * FROM users WHERE chatid = ?",
    [`chat${Math.floor(Math.random() * 10000)}01`]
  );

  await connection.end();

  console.log("mysql", req.ip, new Date().toISOString());

  res.json({
    data: result,
  });
};
