const INSERT_DATA_COUNT = 300000000;

const mysql = require("mysql2/promise");

const config = {
  host: "localhost",
  user: "root",
  password: "examplepassword",
  database: "exampledb",
  port: 3306,
};

(async function () {
  let connection;

  try {
    connection = await mysql.createConnection(config);
    console.log("Connected to database");

    await connection.execute(
      "CREATE TABLE IF NOT EXISTS users (" +
        "id INT AUTO_INCREMENT PRIMARY KEY," +
        "username VARCHAR(255)," +
        "chatid VARCHAR(255)," +
        "createdat DATETIME)"
    );

    const chunkSize = 20000;
    for (let i = 1; i <= INSERT_DATA_COUNT; i += chunkSize) {
      const values = [];
      for (let j = i; j < i + chunkSize; j++) {
        values.push([`user${j}`, `chat${i}`, new Date()]);
      }
      const placeholders = values.map(() => "(?, ?, ?)").join(", ");

      await connection.execute(
        `INSERT INTO users (username, chatid, createdat) VALUES ${placeholders}`,
        [].concat(...values)
      );
      console.log(`Inserted ${i}-${i + chunkSize - 1}`);
    }
  } catch (err) {
    console.error(err.stack);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
})();
