mp.events.delayInitialization = true;

const fs = require("fs");

if (!fs.existsSync(__dirname + "/config/settings.json")) {
  console.log(`${"You do not have a 'settings.json' file setup."}`);
  process.exit(0);
} else {
  mp.settings = require("./config/settings.json");
}

mp.db = require("mysql2/promise").createPool({
  host: mp.settings.db_host,
  user: mp.settings.db_username,
  password: mp.settings.db_password,
  database: mp.settings.db_name,
  connectionLimit: mp.settings.db_connectionLimit,
  multipleStatements: true,
});
// mp.test = require('./test.js');
require("./events/auth.js");
const database = require("./config/database.js");

(async () => {
  try {
    await database.initializeDatabase();
    // await mp.test.init();
    mp.events.delayInitialization = false;
  } catch (e) {
    console.log(e);
  }
})();

require("./commands/index.js");
require("./modules/index.js");
