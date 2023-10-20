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

    await connection.execute("CREATE INDEX chatid_index ON users (chatid)");
  } catch (err) {
    console.error(err.stack);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
})();
