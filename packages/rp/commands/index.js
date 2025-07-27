const fs = require("fs");
const path = require("path");

const commandFiles = fs
  .readdirSync(__dirname)
  .filter((file) => file.endsWith(".js") && file !== "index.js");

for (const file of commandFiles) {
  require(path.join(__dirname, file));
}
