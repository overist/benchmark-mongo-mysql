"use strict";
// const simple = require('./handlers/simple')
const mongo = require("./handlers/mongo");
const mysql = require("./handlers/mysql");

module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get("/mongo", mongo);
  app.get("/mysql", mysql);
};
